// src/components/Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen shadow-md fixed">
      <div className="p-4 text-lg font-bold text-center">Mentor me.</div>
      <nav className="mt-10">
        <ul>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">Overview</li>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">Users</li>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">Mentors</li>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">Blogs</li>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">Verifications</li>
          <li className="px-6 py-2 text-gray-700 hover:bg-gray-200">Reports</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
