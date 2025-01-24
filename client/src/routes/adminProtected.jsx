import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';


const AdminProtected = () => {
  const adminToken = Cookies.get('Admintoken')
  console.log(adminToken);
  return adminToken ? <Outlet /> : <Navigate to="/admin/login"/>;
};

export default AdminProtected;