
import React from 'react';
import { FiHome, FiCalendar, FiMessageSquare, FiDollarSign, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MentorHome = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full fixed top-0 bg-white p-4 shadow-md flex justify-between items-center z-10">
  <h1 className="text-2xl font-bold text-indigo-600">Mentor me.</h1>
  <div className="flex items-center space-x-4">
 
    <a href="#" className="text-indigo-500">
      <i className="fas fa-bell text-xl"></i>
    </a>
    
    <a href="#" className="text-indigo-500">Sign Out</a>3
    
    <img
      src="https://randomuser.me/api/portraits/men/75.jpg"
      alt="profile"
      className="w-8 h-8 rounded-full"
    />
  </div>
</header>

      {/* Sidebar */} 
      
      <aside className="w-64 fixed top-16 bottom-0 left-0 bg-white shadow-md flex flex-col pt-6 z-10">
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
          <a href="#" className="flex items-center space-x-3 px-6 py-3">
            <FiUser size={24} />
            <span  onClick={() => navigate('/mentor/availability')} >Availability</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 mt-16 p-6 flex-1 overflow-y-auto">
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recently Added */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Recently Added</h2>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Leila Vanz', phone: '909-999-8911', email: 'leila@tech.com', date: '17th October 2023' },
                    { name: 'Juna Saller', phone: '909-223-8978', email: 'juna@tech.com', date: '17th October 2023' },
                    { name: 'Kevin West', phone: '823-587-5562', email: 'kevin@tech.com', date: '18th October 2023' },
                    { name: 'Cathy Stater', phone: '872-587-5562', email: 'cathy@tech.com', date: '19th October 2023' },
                  ].map((person, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{person.name}</td>
                      <td>{person.phone}</td>
                      <td>{person.email}</td>
                      <td>{person.date}</td>
                      <td>
                        <button className="text-indigo-500">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="profile"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-center text-xl font-semibold">Jishad Ali</h3>
              <p className="text-center text-gray-600">Software Intern at Bootstrap</p>
              <div className="text-center mt-4">
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-full">View Profile</button>
              </div>
            </div>

            {/* Compliance Overview */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Compliance Overview</h3>
              <div className="flex justify-center">
                <div className="w-32 h-32">
                  <svg viewBox="0 0 36 36" className="circular-chart blue">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      strokeDasharray="60, 100"
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">60%</text>
                  </svg>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex justify-between">
                  <span>Compliant</span>
                  <span>35</span>
                </li>
                <li className="flex justify-between">
                  <span>Expiring Soon</span>
                  <span>13</span>
                </li>
                <li className="flex justify-between">
                  <span>Expired</span>
                  <span>6</span>
                </li>
              </ul>
            </div>

            {/* Thesis Progress */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Thesis Progress</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Current revision</span>
                  <span>72% finished</span>
                </li>
                <li className="flex justify-between">
                  <span>Pending</span>
                  <span>60% finished</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default MentorHome;