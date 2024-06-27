import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import Protected from './protected'
import UserLogin from '../pages/mentee/userLogin'
import Signup from '../pages/mentee/Signup'
import MenteeHome from '../pages/mentee/MenteeHome'
import MentorApplicationForm from '@/pages/mentor/MentorApplicationForm'
import MenteeAditionalForm from '@/pages/mentee/menteeAditionalForm'
import RoleSelectorCard from '@/pages/others/roleSelectorCard'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminHome from '@/pages/admin/Home'
import AdminProtected from './adminProtected'
import ConfirmationPage from '@/pages/mentor/requestLoadingPage'
import MentorHome from '@/pages/mentor/MentorHome'
import MentorLogin from '@/pages/mentor/MentorLogin'
import MentorProtected from './mentorProtected'
import LandingPage from '@/pages/others/LandingPage'
import PageNotFound from '@/pages/others/notFount'
import MentorDetails from '@/pages/mentee/MentorDeatails'
import MentorAvailability from '@/pages/mentor/Availability'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<LandingPage />} />

      <Route  element={<Protected/>}>
        <Route path='/mentee'>
        <Route index element={<MenteeHome />} />
            <Route path='home' element={<MenteeHome/>}/>
            <Route path='mentorDetails/:mentorId' element={<MentorDetails/>}/>
            
        </Route>
      </Route>

      <Route element={<AdminProtected/>}>
        <Route path='/admin'>
        <Route index element={<AdminHome />} />
         <Route path='home' element={<AdminHome/>}/>
        </Route> 
      </Route>

      <Route  element={<MentorProtected/>}> 
        <Route path='/mentor'>
          <Route index element={<MentorHome />} />
          <Route path='home' element={<MentorHome/>}/>
          <Route path='availability' element={<MentorAvailability/>}/>
        </Route>    
      </Route>

      <Route path="/mentee/login" element={<UserLogin />} />
      <Route path="/mentor/login" element={<MentorLogin />}/>
      <Route path="/signup" element={<Signup />}/>                      
      <Route path='/chooseRole/:userId' element={<RoleSelectorCard/>} />
      <Route path='/mentorAppForm/:userId' element={<MentorApplicationForm/>} />
      <Route path='/menteeAppForm/:userId' element={<MenteeAditionalForm/>} />    
      <Route path='/mentor/MentorConfirmationPage' element={<ConfirmationPage/>} />
      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path="*" element={ <PageNotFound/>}/>

    </Route>
    
  )
)

export default router;  