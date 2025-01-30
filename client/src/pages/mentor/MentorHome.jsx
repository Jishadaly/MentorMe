


import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MentorHome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);


  const recentlyAdded = [
    { name: 'Lela Mraz', role: 'Full Stack Intern', phone: '985-959-1871', email: 'darwin11@yahoo.com', date: '02 November 2023' },
    { name: 'Lena Heller', role: 'JS Intern', phone: '714-432-3304', email: 'naomi33@yahoo.com', date: '01 November 2023' },
    { name: 'Irvin West', role: 'React Intern', phone: '813-218-6767', email: 'felipe91@yahoo.com', date: '01 November 2023' },
    { name: 'Cathy Stehr', role: 'Node JS Intern', phone: '552-998-6525', email: 'kitty48@yahoo.com', date: '31 October 2023' }
  ];

  const complianceOverview = {
    total: 55,
    compliant: 36,
    expiringSoon: 13,
    expired: 6
  };

  const thesisProgress = {
    current: { count: 78, percentage: 32 },
    pending: { count: 60, percentage: 43 }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 ml-32 mt-20">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recently Added Section */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-xl font-bold mb-4">Recently Added</h2>
            <div className="space-y-4">
              {recentlyAdded.map((person, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 font-semibold">{person.name}</p>
                    <p className="text-gray-600">{person.role}</p>
                  </div>
                  <div>
                    <p className="text-gray-900">{person.phone}</p>
                    <p className="text-gray-600">{person.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{person.date}</p>
                  </div>
                  <button
                    onClick={() => navigate('/details')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Details
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* User Profile Section */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold">{user?.name || 'jishad ali'}</h3>
            <p className="text-gray-600">{user?.jobTitle || 'Software Intern at Brototype'}</p>
            <button
              onClick={() => navigate('/profile')}
              className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
            >
              View Profile
            </button>
          </div>
          {/* Compliance Overview Section */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
            <h2 className="text-xl font-bold mb-4">Compliance Overview</h2>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-2xl font-bold">{complianceOverview.total}</p>
                <p className="text-gray-600">Total</p>
              </div>
              <div>
                <p className="text-gray-600">Compliant</p>
                <p className="text-gray-900">{complianceOverview.compliant}</p>
              </div>
              <div>
                <p className="text-gray-600">Expiring Soon</p>
                <p className="text-gray-900">{complianceOverview.expiringSoon}</p>
              </div>
              <div>
                <p className="text-gray-600">Expired</p>
                <p className="text-gray-900">{complianceOverview.expired}</p>
              </div>
            </div>
          </div>
          {/* Thesis Progress Section */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
            <h2 className="text-xl font-bold mb-4">Thesis Progress</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Current mentors</p>
                  <p className="text-gray-900">{thesisProgress.current.count} Registered</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{thesisProgress.current.percentage}%</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Pending</p>
                  <p className="text-gray-900">{thesisProgress.pending.count} Registered</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{thesisProgress.pending.percentage}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorHome;
