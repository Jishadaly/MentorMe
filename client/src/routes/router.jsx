import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import Protected from './protected'
// import AdminProtected from './adminProtected'
import UserLogin from '../pages/mentee/userLogin'
import Signup from '../pages/mentee/Signup'
import MenteeHome from '../pages/mentee/MenteeHome'
import MentorApplicationForm from '@/pages/mentor/MentorApplicationForm'
import MenteeAditionalForm from '@/pages/mentee/menteeAditionalForm'
import RoleSelectorCard from '@/componets/modal/roleSelectorCard'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminHome from '@/pages/admin/Home'
import AdminProtected from './adminProtected'
import ConfirmationPage from '@/pages/mentor/requestLoadingPage'
import MentorHome from '@/pages/mentor/MentorHome'
import MentorLogin from '@/pages/mentor/MentorLogin'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route element={<Protected/>}>
          <Route index element={<MenteeHome/>}/>
      </Route>

      <Route element={<AdminProtected/>}>
      <Route path='/admin/home' element={<AdminHome/>} />
      </Route>

      {/* <Route element={} /> */}

      <Route path="/userLogin" element={<UserLogin />} />
      <Route path="/MentorLogin" element={<MentorLogin />} />

      
      <Route path="/signup" element={<Signup />}/>
      <Route path='/chooseRole/:userId' element={<RoleSelectorCard/>} />
      <Route path='/mentorAppForm/:userId' element={<MentorApplicationForm/>} />
      <Route path='/menteeAppForm/:userId' element={<MenteeAditionalForm/>} />
      <Route path='/MentorConfirmationPage' element={<ConfirmationPage/>} />
      <Route path='/mentorHome' element={<MentorHome/>} />

      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path="*" element={ <h1>Page not found</h1>}/>

    </Route>
    
  )
)

export default router;  