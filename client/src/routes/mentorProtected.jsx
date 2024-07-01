import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie'

const MentorProtected = () => {
  const Mentortoken = Cookies.get("token");
  return Mentortoken ? <Outlet /> : <Navigate to="/mentor/login" />;
};

export default MentorProtected;