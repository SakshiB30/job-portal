import { Divider } from "@mantine/core"
import JobHistory from "../Components/JobHistory/JobHistory"



const JobHistoryPage = () => {
  return (
    
       <div className="min-h-screen bg-mine-shaft-950 font-['poppins'] px-5">
        <Divider size="xs" />
      <div className="flex gap-5">
        <JobHistory/>
      </div>
    </div>
    
  )
}

export default JobHistoryPage
