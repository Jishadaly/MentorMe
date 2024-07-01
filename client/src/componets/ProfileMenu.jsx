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
     persistor.purge(); // Purge the persisted state
     localStorage.clear(); // Clear local storage

  }

  return (
    isOpen && (
      <div className="absolute bottom-20 left-0 w-48 bg-white shadow-lg rounded-md p-2">
        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
        <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
      </div>
    )
  );
}

export default ProfileMenu;
