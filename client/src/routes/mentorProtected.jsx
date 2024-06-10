import { Navigate, Outlet } from "react-router-dom";

const MentorProtected = () => {
  const Mentortoken = localStorage.getItem("Mentortoken");
  return Mentortoken ? <Outlet /> : <Navigate to="/MentorLogin" />;
};

export default MentorProtected;