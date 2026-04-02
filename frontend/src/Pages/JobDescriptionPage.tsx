import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import JobDesc from "../Components/JobDescription/JobDesc"
import RecommandedJobs from "../Components/JobDescription/RecommandedJobs"




const JobDescriptionPage = () => {
   return (
    
      <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] p-4">
       
        <Link className="my-4 inline-block" to="/find-jobs">
            <Button leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light" >Back</Button>
        </Link>
        <div className="flex gap-5 justify-around">
           <JobDesc/>
           <RecommandedJobs/>
        </div>
      </div>
  )
}

export default JobDescriptionPage
