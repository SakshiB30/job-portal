import axios from "axios"
const base_url="http://localhost:8080/users/"

const registerUser= async(user:any)=>{
    return axios.post(`${base_url}register`,user)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const loginUser = async (login: any) => {
  return axios.post(`${base_url}login`, login)
    .then(res => res.data)
    .catch(error => {
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Message:", error.response.data);
      } else if (error.request) {
        console.log("No response from server");
      } else {
        console.log("Error:", error.message);
      }
      throw error; 
    });
}

const sendOTP= async(email:any)=>{
    return axios.post(`${base_url}sendOtp/${email}`)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const verifyOtp= async(email:any, otp:any)=>{
    return axios.get(`${base_url}verifyOtp/${email}/${otp}`)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const changePass= async(email:string, password:string)=>{
    return axios.post(`${base_url}changePass`, {email, password})
    .then(res=>res.data)
    .catch(error=>{throw error;});
}


export {registerUser, loginUser, sendOTP, verifyOtp, changePass }