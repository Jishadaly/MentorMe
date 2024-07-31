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
import MenteeProfile from '@/pages/mentee/MenteeProfile'
import CreateBlogs from '@/pages/mentor/CreateBlogs'
import MenteeLayout from '@/pages/layouts/MenteeLayout'
import MentorLayout from '@/pages/layouts/MentorLayout'
import BlogList from '@/pages/mentee/BlogList'
import BlogView from '@/pages/mentee/BlogView'
import Blogs from '@/pages/mentor/Blogs'
import EditBlog from '@/pages/mentor/EditBlog'
import Chat from '@/pages/mentee/chat'
import MentorChat from '@/pages/mentor/chat/chat'
import MentorProfile from '@/pages/mentor/MentorProfile'
import SlotManage from '@/pages/admin/slotManage'
import CallesPage from '@/pages/mentee/Calles'
import Sessions from '@/pages/mentor/sessions/Sessions'
import Room from '@/pages/mentor/sessions/room'
import Notifications from '@/pages/others/notifications/Notifications'

const router = createBrowserRouter( 
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<LandingPage />} />

      <Route  element={<Protected/> }>
        <Route path='/mentee' element={<MenteeLayout/>}>
        <Route index element={<MenteeHome />} />
            <Route path='home' element={<MenteeHome/>}/>
            <Route path='mentorDetails/:mentorId' element={<MentorDetails/>}/>
            <Route path='calles' element={<CallesPage/>}/>
            <Route path='profile' element={<MenteeProfile/>}/>
            <Route path='blogs' element={<BlogList/>}/>
            <Route path='blogView/:blogId' element={<BlogView/>}/>
            <Route path='chat' element={<Chat/>}/>
            <Route path='notifications' element={<Notifications/>}/>
        </Route>
      </Route>

      <Route element={<AdminProtected/> }>
        <Route path='/admin'>
        <Route index element={<AdminHome/>} />
         <Route path='home' element={<AdminHome/>}/>
         <Route path='slotManage' element={<SlotManage/>}/>
         


        </Route>                                                          
      </Route>

      <Route  element={<MentorProtected/>}> 
        <Route path='/mentor' element={<MentorLayout/>}>
          <Route index element={<MentorHome />} />
          <Route path='home' element={<MentorHome/>}/>
          <Route path='availability' element={<MentorAvailability/>}/>
          <Route path='Createblogs' element={<CreateBlogs/>} />
          <Route path='blogs' element={<Blogs/>} />
          <Route path='editBlog/:blogId' element={<EditBlog/>}/>
          <Route path='chat' element={<MentorChat/>}/>
          <Route path='chat' element={<Chat/>}/>
          <Route path='profile' element={<MentorProfile/>}/>
          <Route path='sessions' element= {<Sessions/>}/>
          <Route path='notifications' element={<Notifications/>}/>
           
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
      <Route path='/meet/:roomId' element= {<Room/>} />
    </Route>
  )
)

export default router 