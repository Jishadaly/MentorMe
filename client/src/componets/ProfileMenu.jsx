import { logout } from '@/redux/slice/userAuthSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function ProfileMenu({ isOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = ()=>{
     dispatch(logout());
     navigate('/mentee/login');
     persistor.purge();
     localStorage.clear(); 
  }

  return (
    isOpen && (
      <div className="absolute bottom-20 left-0 w-48 bg-white shadow-lg rounded-md p-2">
        <Link to="/mentee/profile" className="block px-4 py-2 font-inter text-sm text-gray-700 hover:bg-indigo-100">Public Profile</Link>
        <Link to="/mentee/profile" className="block px-4 py-2 text-sm font-inter text-gray-700 hover:bg-indigo-100">Mentor Profile</Link>
        <a onClick={handleLogout} className="block px-4 py-2 font-inter text-sm text-red-700 hover:bg-indigo-100">Logout</a>
      </div>
    )
  );
}

export default ProfileMenu;