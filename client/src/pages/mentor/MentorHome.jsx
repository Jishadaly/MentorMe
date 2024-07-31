
import React from 'react';
import Header from './partials/Header';
import SideNav from './partials/SideNav';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../admin/Dashboard';
const MentorHome = () => {
  const navigate = useNavigate() 

  const user = useSelector((state)=> state.auth.user);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1">
      <div className="mx-auto grid md:mr-10 md:ml-52  mt-20">< Dashboard/></div>
        </main>
        
      
    </div>
  );
};
export default MentorHome;