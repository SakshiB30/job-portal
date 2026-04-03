import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experiences from "./Experiences";
import Certificates from "./Certificates";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { successNotification } from "../../Services/NotificationService";


const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);


  useEffect(() => {
    console.log(profile);
    getProfile(user.id)
      .then((data: any) => {
        dispatch(setProfile(data));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const { hovered, ref } = useHover();
  const handleFileChange = async (image:any) => {
    // Handle file change logic here, e.g., upload the new profile picture
    let picture = await getBase64(image);
    let updatedProfile = { ...profile, picture: (picture as string).split(',')[1] };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success","Profile picture updated successfully");
  }

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  return (
    
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner2.jpg" alt="" />
        <div ref={ref} className="absolute flex items-center justify-center -bottom-1/3 left-3">
          <Avatar
          className="h-48! w-48! rounded-full border-mine-shaft-950 border-8"
          src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "/A3.png"}
          alt=""
        />
        {hovered && <Overlay className="rounded-full!" color="#000" backgroundOpacity={0.75} />}
        {hovered && <IconEdit className="absolute z-300 w-12! h-12!" />}
        {hovered && <FileInput onChange={handleFileChange} className="absolute **:rounded-full! z-301 **:h-full! h-full! w-full!" variant="transparent" accept="image/png,image/jpeg" />}
        </div>
        
      </div>

      <div className="px-3 mt-30">
        <Info />
        <Divider my="xl" />
        <About />
        <Divider my="xl" />
        <Skills />
        <Divider my="xl" />
      <Experiences />
        <Divider my="xl" />
       <Certificates/>
      </div>
    </div>
  );
};

export default Profile;
