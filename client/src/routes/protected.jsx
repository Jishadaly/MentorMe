import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const Protected = () => {
  const token = Cookies.get("token");
  return token ? <Outlet /> : <Navigate to="/mentee/login" />;
};

export default Protected

