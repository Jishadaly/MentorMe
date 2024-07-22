import React from 'react';
import { FiHome, FiCalendar, FiMessageSquare, FiDollarSign, FiUser , FiFileText , FiUploadCloud , FiList} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function SideNav({ isOpen }) {
  const navigate = useNavigate();
  return (
    <div>
      <aside className={`fixed top-16 bottom-0 left-0 bg-white shadow-md flex flex-col pt-6 z-10 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <nav className="flex flex-col space-y-6">
          <a href="#" className="flex items-center space-x-3 px-6 py-3 text-indigo-500">
            <FiHome size={24} />
            <span onClick={()=> navigate('/mentor')}>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-6 py-3">
            <FiCalendar size={24} />
            <span>Sessions</span>
          </a>
          <a href="#"  className="flex items-center space-x-3 px-6 py-3">
            <FiList size={24} />
            <span>Bookings</span>
          </a>
          <a href="#" onClick={() => navigate('/mentor/chat')} className="flex items-center space-x-3 px-6 py-3">
            <FiDollarSign size={24} />
            <span>Messages</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-6 py-3">
            <FiUser size={24} />
            <span>Payment</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-6 py-3" onClick={() => navigate('/mentor/availability')}>
            <FiUploadCloud size={24} />
            <span>Availability</span>
          </a>  
          <a href="#" className="flex items-center space-x-3 px-6 py-3" onClick={() => navigate('/mentor/blogs')} >
            <FiFileText size={24} />
            <span>Blogs</span>
          </a>
        </nav>
      </aside>
    </div>
  );
}

export default SideNav;
