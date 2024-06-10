import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtected = () => {
  const adminToken = localStorage.getItem("token");
  console.log(adminToken);
  return adminToken ? <Outlet /> : <Navigate to="/admin/login"/>;
};

export default AdminProtected;
