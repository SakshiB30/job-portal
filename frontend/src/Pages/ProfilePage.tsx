import Profile from "../Components/Profile/Profile";
import { profile } from "../Data/TalentData"



const ProfilePage = () => {
 console.log(profile);
  return (
    <div className="min-h-screen bg-mine-shaft-950 font-['poppins']">
      <Profile {...profile}/>
    </div>
  )
}

export default ProfilePage
 