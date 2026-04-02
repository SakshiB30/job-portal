package com.jobportal.Job.Portal.service;

import com.jobportal.Job.Portal.dto.LoginDTO;
import com.jobportal.Job.Portal.dto.ResponseDTO;
import com.jobportal.Job.Portal.dto.UserDTO;
import com.jobportal.Job.Portal.entity.OTP;
import com.jobportal.Job.Portal.entity.User;
import com.jobportal.Job.Portal.exception.JobPortalException;
import com.jobportal.Job.Portal.repository.OTPRepository;
import com.jobportal.Job.Portal.repository.UserRepository;
import com.jobportal.Job.Portal.utility.Data;
import com.jobportal.Job.Portal.utility.Utilities;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service(value = "userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileService profileService;
    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException {

//        if(userRepository.existsByEmail(userDTO.getEmail())){
//            throw new RuntimeException("Email already exists");
//        }

        Optional<User> optionalUser= userRepository.findByEmail(userDTO.getEmail());
        if(optionalUser.isPresent())throw new JobPortalException("USER_FOUND");
        userDTO.setProfileId(profileService.createProfile(userDTO.getEmail()));

        userDTO.setId(Utilities.getNextSequence("users"));
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User user =userDTO.toEntity();
        user =userRepository.save(user);
        return user.toDTO();
    }

    @Override
    public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException {
        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
        if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) throw new JobPortalException("INVALID_CREDENTIALS");
        return user.toDTO();
    }

    @Override
    public boolean sendOtp(String email) throws Exception {
        User user =userRepository.findByEmail(email).orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Your OTP Code");
        String genOtp = Utilities.generateOtp();
        OTP otp = new OTP(email, genOtp, LocalDateTime.now());
        otpRepository.save(otp);
        mimeMessageHelper.setText(Data.getMessageBody(genOtp,user.getName()),true);
        javaMailSender.send(mimeMessage);
        return true;
    }

    @Override
    public boolean verifyOtp(String email, String otp) throws JobPortalException {
        OTP otpEntity = otpRepository.findById(email).orElseThrow(()-> new JobPortalException("OTP_NOT_FOUND"));
        if(!otpEntity.getOtpCode().equals(otp))throw new JobPortalException("OTP_INCORRECT");
        return true;
    }

    @Override
    public ResponseDTO changePassword(LoginDTO loginDTO) throws JobPortalException {
        User user =userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
        user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
        userRepository.save(user);
        return new ResponseDTO("Password Changed Successfully.");
    }

    @Scheduled(fixedRate = 60000)
    public void removeExpiredOTPs(){
        LocalDateTime expiry= LocalDateTime.now().minusMinutes(5);
        List<OTP>expiredOTPs=otpRepository.findByCreationTimeBefore(expiry);
        if(!expiredOTPs.isEmpty()){
            otpRepository.deleteAll(expiredOTPs);
            System.out.println("Removed "+expiredOTPs.size()+" expired OTPs");
        }

    }


}





