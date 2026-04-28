// import ProfileMenu from '@/componets/ProfileMenu';
// import React, { useState, useEffect, useRef } from 'react';
// import { FiHome, FiCompass, FiBook, FiMessageSquare, FiCalendar, FiVideo, FiMoreHorizontal, FiUser } from 'react-icons/fi';
// import { Link } from 'react-router-dom';

// function Sidenav() {
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const profileMenuRef = useRef(null);

//   const toggleProfileMenu = () => {
//     setIsProfileMenuOpen(!isProfileMenuOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//       setIsProfileMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <aside className="w-20 fixed top-16 bottom-0 left-0 bg-white shadow-md flex flex-col justify-between items-center pt-6 z-10">
//       <nav className="flex flex-col items-center space-y-6">
//         <Link to="/mentee/home" className="text-indigo-500"><FiHome size={24} /></Link>
//         <Link to="/mentee/blogs" className="text-indigo-500"><FiCompass size={24} /></Link>
//         <Link to="/mentee/home" className="text-indigo-500"><FiBook size={24} /></Link>
//         <a href="/mentee/chat" className="text-indigo-500"><FiMessageSquare size={24} /></a>
//         <Link to="/mentee/calles" className="text-indigo-500"><FiVideo size={24} /></Link>
//         <a href="#" className="text-indigo-500"><FiCalendar size={24} /></a>
//         <a href="#" className="text-indigo-500"><FiMoreHorizontal size={24} /></a>
//       </nav>
//       <div className="mb-6" ref={profileMenuRef}>
//         <a href="#" className="text-indigo-500" onClick={toggleProfileMenu}><FiUser size={24} /></a>
//         <ProfileMenu isOpen={isProfileMenuOpen} />
//       </div>
//     </aside>
//   );
// }

// export default Sidenav;



// ============================================
// 3. Sidenav.jsx - Responsive Sidebar
// ============================================
import ProfileMenu from '@/componets/ProfileMenu';
import React, { useState, useEffect, useRef } from 'react';
import { FiHome, FiCompass, FiBook, FiMessageSquare, FiCalendar, FiVideo, FiMoreHorizontal, FiUser } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

function Sidenav() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/mentee/home', icon: FiHome, label: 'Home' },
    { path: '/mentee/blogs', icon: FiCompass, label: 'Explore' },
    { path: '/mentee/chat', icon: FiMessageSquare, label: 'Messages' },
    { path: '/mentee/calles', icon: FiVideo, label: 'Sessions' },
    { path: '/mentee/calendar', icon: FiCalendar, label: 'Calendar' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-20 fixed top-16 bottom-0 left-0 bg-white shadow-sm flex-col justify-between items-center py-6 z-40 border-r border-gray-200">
        <nav className="flex flex-col items-center space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-3 rounded-xl transition-all duration-200 group relative ${
                isActive(item.path)
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'
              }`}
              title={item.label}
            >
              <item.icon size={24} />
              
              {/* Tooltip on hover */}
              <span className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={toggleProfileMenu}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isProfileMenuOpen
                ? 'bg-indigo-100 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'
            }`}
          >
            <FiUser size={24} />
          </button>
          <ProfileMenu isOpen={isProfileMenuOpen} />
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
                isActive(item.path)
                  ? 'text-indigo-600'
                  : 'text-gray-600'
              }`}
            >
              <item.icon size={22} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
          
          <button
            onClick={toggleProfileMenu}
            className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
              isProfileMenuOpen ? 'text-indigo-600' : 'text-gray-600'
            }`}
            ref={profileMenuRef}
          >
            <FiUser size={22} />
            <span className="text-xs mt-1">Profile</span>
            <ProfileMenu isOpen={isProfileMenuOpen} />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Sidenav;

