import React from 'react';
import { logout } from '@/redux/slice/userAuthSlice';
import { FiMenu, FiX } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline';

function Header({ toggleMenu, isOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/mentor/login');
    persistor.purge(); // Purge the persisted state
    localStorage.clear(); // Clear local storage
  };

  return (
    <header className="w-full fixed top-0 bg-white p-4 shadow-md flex justify-between items-center z-10">
      <div className="flex items-center">
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden mr-4">
          <button onClick={toggleMenu} className="text-2xl text-indigo-600">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        <h1 className="text-2xl font-extrabold text-indigo-600 font-inter">Mentor me.</h1>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-indigo-500">
          <i className="fas fa-bell text-xl"></i>
        </a>
        {/* <a onClick={handleLogout} href="#" className="text-indigo-500 font-inter font-bold">Sign Out</a> */}
        <div className='flex justify-center  cursor-pointer ' >
        <div className='mr-6 w-6 text-indigo-500' onClick={()=> navigate('/mentor/notifications')}><BellIcon/></div>
        <img onClick={()=> navigate('/mentor/profile')}
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="profile"
          className="w-8 h-8 rounded-full"  
        />
       
        </div>
        
      </div>
    </header>
  );
}

export default Header;