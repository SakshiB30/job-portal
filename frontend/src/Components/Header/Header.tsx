import { Indicator, Button } from "@mantine/core"
import { IconAnchor, IconBell,IconSettings } from "@tabler/icons-react"
import  NavLinks from "./NavLinks"
import { Link, useLocation } from "react-router-dom"
import ProfileMenu from "./ProfileMenu"
import { useDispatch, useSelector } from "react-redux"
import { setProfile } from "../../Slices/ProfileSlice"
import { useEffect } from "react"
import { getProfile } from "../../Services/ProfileService"

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);


  useEffect(() => {
    getProfile(user.id)
      .then((data: any) => {
        dispatch(setProfile(data));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
    const location = useLocation();
  return (
    location.pathname!="/sign-up" && location.pathname!="/login" ?<div className="w-full h-20 px-6  text-white flex justify-between items-center  bg-mine-shaft-950 font-['poppins']">
        <div className="flex gap-3 items-center text-bright-sun-400">
            <IconAnchor className="h-10 w-10" stroke={3}/>
            <div className="text-3xl font-semibold"> JobHook</div>
            </div>
        
            {NavLinks()}

        <div className="flex items-center gap-5">   
            
            {user ? <ProfileMenu/>: <Link to="/login"><Button variant="subtle" color="brightSun.4">Login</Button></Link>}
            {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
                <IconSettings stroke={1.5}/>
            </div>  */}
            <div className="bg-mine-shaft-900 p-1.5 rounded-full">
                <Indicator color="pink" offset={6} size={9} processing>
                <IconBell stroke={1.5}/>
                </Indicator>
            </div>          
        </div>
    </div>: 
    <>
    </>
  )
}

export default Header
