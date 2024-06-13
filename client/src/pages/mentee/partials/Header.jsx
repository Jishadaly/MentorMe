import React from 'react'
import { FiUser, FiBell, FiHome, FiCompass, FiBook, FiMessageSquare, FiCalendar, FiVideo, FiMoreHorizontal } from 'react-icons/fi'; // React icons for navigation
import { HiOutlineSearch } from 'react-icons/hi';

function Header() {
  return (
      
      <header className="w-full fixed top-0 bg-white p-4 shadow-md flex justify-between items-center z-10">
        <h1 className="text-2xl font-extrabold text-black-600 font-inter">Mentor me.</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-200 rounded-full shadow-md">
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-l-full focus:outline-none" 
              placeholder="Search creators..." 
            />
            <button className="p-2  text-indigo-500">
              <HiOutlineSearch size={24} />
            </button>
          </div>
          <FiBell size={24} className="text-gray-700" />
          {/* <FiUser size={24} className="text-gray-700" /> */}
        </div>
      </header>
    
  )
}

export default Header
