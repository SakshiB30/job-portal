import { useEffect, useState } from "react";
import JobCard from "./JobCard"
import Sort from "./Sort"
import { getAllJobs } from "../../Services/JobService";


const Jobs = () => {
  const [jobList, setJobList] = useState([{}]);
  useEffect(() => {
   getAllJobs().then((res) => {
    setJobList(res);
   }).catch((error) => { 
      console.log(error);
   });
  }, []);
  return (
    <div className="px-5 py-5"> 
        <div className="flex justify-between">
            <div className="text-2xl font-semibold">Recommended Jobs</div>
            <div>
                <Sort />
            </div>   
        </div>
    
        <div className="flex flex-wrap gap-5 mt-10 justify-between">
              {
              jobList.map((job, index) => 
                <JobCard key={index} {...job}/>
              )
              }
        </div>
    </div>
  )
}

export default Jobs


