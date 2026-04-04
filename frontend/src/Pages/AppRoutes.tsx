import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import JobDescriptionPage from "./JobDescriptionPage"
import FindJobs from "./FindJobs"
import ApplyJobPage from "./ApplyJobPage"
import CompanyPage from "./CompanyPage"
import FindTalentPage from "./FindTalentPage"
import PostedJobPage from "./PostedJobpage"
import TalentProfilePage from "./TalentProfilePage"
import PostJobPage from "./PostJobPage"
import SignUpPage from "./SignUpPage"
import ProfilePage from "./ProfilePage"
import JobHistoryPage from "./JobHistoryPage"
import HomePage from "./HomePage"
import { Divider } from "@mantine/core"
import { useSelector } from "react-redux"


const AppRoutes = () => {

    const location = useLocation();
    const user= useSelector((state:any)=>state.user);

  return (
    
    <div className='relative'>
      <Header/ >
      {location.pathname!="/sign-up" &&(<Divider size="xs" />)}
      <Routes> 
        <Route path='/find-jobs' element={<FindJobs/>}/>
        <Route path='/jobs/:id' element={<JobDescriptionPage/>}/>
        <Route path='/apply-job/:id' element={<ApplyJobPage/>}/>        
        <Route path='/find-talent' element={<FindTalentPage/>}/>
        <Route path='/company/:name' element={<CompanyPage/>}/>        
        <Route path='/posted-job' element={<PostedJobPage/>}/>        
        <Route path='/talent-profile' element={<TalentProfilePage/>}/>
        <Route path='/post-job' element={<PostJobPage/>}/>
        <Route path='/sign-up' element={user?<Navigate to="/"/>:<SignUpPage/>}/>        
        <Route path='/login' element={user?<Navigate to="/"/>:<SignUpPage/>}/> 
        <Route path='/profile' element={<ProfilePage/>}/>      
        <Route path='/job-history' element={<JobHistoryPage/>}/>
        <Route path='*' element={<HomePage/>}/>
      </Routes>  
      <Footer />
      </div> 
      
  )
}

export default AppRoutes
