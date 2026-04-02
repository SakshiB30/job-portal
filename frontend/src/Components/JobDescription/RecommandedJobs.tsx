import { jobList } from "../../Data/JobsData";
import JobCard from "../FindJobs/JobCard";

const RecommandedJobs = () => {
  return <div>
    <div className="text-xl font-semibold mb-5">Recommended Talent</div>
        <div className="flex flex-col flex-wrap gap-5 justify-between">
            {
            jobList.map((job,index) => index<5 && <JobCard keys={index} {...job}/>)}
        </div>
  </div>;
};

export default RecommandedJobs;
