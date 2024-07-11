import ProfileMenu from '@/componets/ProfileMenu';
import React, { useState } from 'react';
import { FiHome, FiCompass, FiBook, FiMessageSquare, FiCalendar, FiVideo, FiMoreHorizontal, FiUser } from 'react-icons/fi'; // React icons for navigation
import { Link } from 'react-router-dom';


function Sidenav() {

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <aside className="w-20 fixed top-16 bottom-0 left-0 bg-white shadow-md flex flex-col justify-between items-center pt-6 z-10">
      <nav className="flex flex-col items-center space-y-6">
        <Link  to="/mentee/home" className = "text-indigo-500 "><FiHome size={24} /></Link>
        <Link  to="/mentee/blogs" className = "text-indigo-500 "><FiCompass size={24} /></Link>
        <Link  to="/mentee/home" className = "text-indigo-500 "><FiBook size={24} /></Link>
        <a href="#" className="text-indigo-500"><FiMessageSquare size={24} /></a>
        <Link  to="/mentee/calles" className = "text-indigo-500 "><FiVideo size={24}/></Link>
        <a href="#" className="text-indigo-500"><FiCalendar size={24} /></a>
        <a href="#" className="text-indigo-500"><FiMoreHorizontal size={24} /></a>
      </nav>
      <div className="mb-6">
      <a href="#" className="text-indigo-500" onClick={toggleProfileMenu}><FiUser size={24} /></a>
      <ProfileMenu isOpen={isProfileMenuOpen} />
      </div>
    </aside>
  );
}

export default Sidenav;
