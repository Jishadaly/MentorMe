import React from 'react';
import { FiHome, FiCalendar, FiMessageSquare, FiDollarSign, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function SideNav({ isOpen }) {
  const navigate = useNavigate();
  return (
    <div>
      <aside className={`fixed top-16 bottom-0 left-0 bg-white shadow-md flex flex-col pt-6 z-10 overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <nav className="flex flex-col space-y-6">
          <a href="#" className="flex items-center space-x-3 px-6 py-3 text-indigo-500">
            <FiHome size={24} />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-6 py-3">
            <FiCalendar size={24} />
            <span>Sessions</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-6 py-3">
            <FiMessageSquare size={24} />
            <span>Bookings</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-6 py-3">
            <FiDollarSign size={24} />
            <span>Messages</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-6 py-3">
            <FiUser size={24} />
            <span>Payment & Coupons</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-6 py-3" onClick={() => navigate('/mentor/availability')}>
            <FiUser size={24} />
            <span>Availability</span>
          </a>
        </nav>
      </aside>
    </div>
  );
}

export default SideNav;
