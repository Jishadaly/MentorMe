import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie'

const MentorProtected = () => {
  const Mentortoken = Cookies.get("mentorToken");
  return Mentortoken ? <Outlet /> : <Navigate to="/mentor/login" />;
};

export default MentorProtected;