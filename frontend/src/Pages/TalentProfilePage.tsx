import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { profile } from "../Data/TalentData"
import Profile from "../Components/TalentProfile/Profile"
import RecommandTalent from "../Components/TalentProfile/RecommandTalent"



const TalentProfilePage = () => {
   return (
    
      <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] p-4">
       
        <Link className="my-4 inline-block" to="/find-talent">
            <Button leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light" >Back</Button>
        </Link>
        <div className="flex gap-5">
            <Profile {...profile}/>
            <RecommandTalent/>
        </div>
      </div>
  )
}

export default TalentProfilePage
