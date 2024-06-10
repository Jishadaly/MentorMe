// import React from 'react';
// import { GifIcon } from '@heroicons/react/24/outline';

// const MentorHome = () => {
//   return (
//     <div className="h-screen w-full flex overflow-hidden select-none">
//       {/* Left Side NavBar */}
//       <nav className="w-24 flex flex-col items-center bg-white dark:bg-gray-800 py-4">
//         {/* App Logo */}
        
//         <div>
//           <svg className="h-8 w-8 fill-current text-blue-600 dark:text-blue-300" viewBox="0 0 24 24">
//             <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82 6L12 12.72 5.18 9 12 5.28 18.82 9M17 16l-5 2.72L7 16v-3.73L12 15l5-2.73V16z"></path>
//           </svg>
//         </div>

//         <ul className="mt-2 text-gray-700 dark:text-gray-400 capitalize">
//           {/* Links */}
//           <li className="mt-3 p-2 text-blue-600 dark:text-blue-300 rounded-lg">
//             <a href="#" className="flex flex-col items-center">
//               <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
//                 <path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10 8h-8v10h8V11m-10 4H3v6h8v-6z"></path>
//               </svg>
//               {/* <span className="text-xs mt-2">dashBoard <GifIcon/></span> */}
              
//             </a>
//           </li>
//           {/* Add other links here */}
//         </ul>
//         <div className="mt-auto flex items-center p-2 text-blue-700 bg-purple-200 dark:text-blue-500 rounded-full">
//           {/* Important action */}
//           <a href="#">
//             <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
//               <path d="M12 1c-5 0-9 4-9 9v7a3 3 0 003 3h3v-8H5v-2a7 7 0 017-7 7 7 0 017 7v2h-4v8h4v1h-7v2h6a3 3 0 003-3V10c0-5-4.03-9-9-9z"></path>
//             </svg>
//           </a>
//         </div>
//       </nav>
//       {/* Main Content Area */}
//       <main className="my-1 pt-2 pb-2 px-10 flex-1 bg-gray-200 dark:bg-black rounded-l-lg transition duration-500 ease-in-out overflow-y-auto">
//         <div className="flex flex-col capitalize text-3xl">
//           <span className="font-semibold">hello,</span>
//           <span>tempest!</span>
//         </div>
//         <div className="flex">
//           <div className="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 rounded-lg">
//             {/* Card list container */}
//             <h3 className="flex items-center pt-1 pb-1 px-8 text-lg font-semibold capitalize dark:text-gray-300">
//               {/* Header */}
//               <span>nearby jobs</span>
//               <button className="ml-2">
//                 <svg className="h-5 w-5 fill-current" viewBox="0 0 256 512">
//                   <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
//                 </svg>
//               </button>
//             </h3>
//             <div>
//               {/* List */}
//               <ul className="pt-1 pb-2 px-3 overflow-y-auto">
//                 <li className="mt-2">
//                   <a className="p-5 flex flex-col justify-between bg-gray-100 dark:bg-gray-200 rounded-lg" href="#">
//                     <div className="flex items-center justify-between font-semibold capitalize dark:text-gray-700">
//                       {/* Top section */}
//                       <span>english lesson</span>
//                       <div className="flex items-center">
//                         <svg className="h-5 w-5 fill-current mr-1 text-gray-600" viewBox="0 0 24 24">
//                           <path d="M14 12l-4-4v3H2v2h8v3m12-4a10 10 0 01-19.54 3h2.13a8 8 0 100-6H2.46A10 10 0 0122 12z"></path>
//                         </svg>
//                         <span>4.2 mi</span>
//                       </div>
//                     </div>
//                     <p className="text-sm font-medium leading-snug text-gray-600 my-3">
//                       {/* Middle section */}
//                       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo assumenda porro sapiente, cum nobis tempore delectus consectetur ullam reprehenderit quis ducimus, iusto dolor nam corporis id perspiciatis consequuntur saepe excepturi.
//                     </p>
//                     <div className="flex justify-between">
//                       {/* Bottom section */}
//                       <div className="flex">
//                         <img className="h-6 w-6 rounded-full mr-3" src="https://i.pinimg.com/originals/b7/06/0b/b7060b60f6ee1beeedf7d648dabd89a1.jpg" alt="" />
//                         <span>
//                           <span className="text-blue-500">michealangelo</span>
//                           <span className="text-gray-500"> - 4.8</span>
//                         </span>
//                       </div>
//                       <span className="bg-green-100 dark:bg-green-500 text-green-600 dark:text-green-100 px-3 py-1 rounded-full text-sm font-semibold">open</span>
//                     </div>
//                   </a>
//                 </li>
//                 {/* Add more list items */}
//               </ul>
//             </div>
//           </div>
//           {/* Right Side */}
//           <div className="w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 rounded-lg">
//             {/* Card list container */}
//             <h3 className="flex items-center pt-1 pb-1 px-8 text-lg font-semibold capitalize dark:text-gray-300">
//               {/* Header */}
//               <span>new applicants</span>
//               <button className="ml-2">
//                 <svg className="h-5 w-5 fill-current" viewBox="0 0 256 512">
//                   <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path>
//                 </svg>
//               </button>
//             </h3>
//             <div>
//               {/* List */}
//               <ul className="pt-1 pb-2 px-3 overflow-y-auto">
//                 <li className="mt-2">
//                   <a className="p-5 flex flex-col justify-between bg-gray-100 dark:bg-gray-200 rounded-lg" href="#">
//                     <div className="flex items-center justify-between font-semibold capitalize dark:text-gray-700">
//                       {/* Top section */}
//                       <span>graphic designer</span>
//                       <div className="flex items-center">
//                         <span>4.2 mi</span>
//                       </div>
//                     </div>
//                     <p className="text-sm font-medium leading-snug text-gray-600 my-3">
//                       {/* Middle section */}
//                       Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis repudiandae error, animi inventore autem deleniti voluptate consectetur exercitationem distinctio, dolorum hic, alias deserunt nemo officia est nulla iusto vero dolorem.
//                     </p>
//                     <div className="flex justify-between">
//                       {/* Bottom section */}
//                       <div className="flex">
//                         <img className="h-6 w-6 rounded-full mr-3" src="https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg" alt="" />
//                         <span>
//                           <span className="text-blue-500">samantha</span>
//                           <span className="text-gray-500"> - 4.5</span>
//                         </span>
//                       </div>
//                       <span className="bg-green-100 dark:bg-green-500 text-green-600 dark:text-green-100 px-3 py-1 rounded-full text-sm font-semibold">open</span>
//                     </div>
//                   </a>
//                 </li>
//                 {/* Add more list items */}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </main>
//       {/* Right Side NavBar (Aside Panel) */}
//       <aside className="w-1/4 my-1 mr-1 px-6 py-4 flex flex-col bg-gray-200 dark:bg-black dark:text-gray-400 rounded-r-lg overflow-y-auto">
//         {/* Add right side content here */}
//       </aside>
//     </div>
//   );
// };

// export default MentorHome;



import React from 'react';
import { FiHome, FiCalendar, FiMessageSquare, FiDollarSign, FiUser } from 'react-icons/fi';

const MentorHome = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full fixed top-0 bg-white p-4 shadow-md flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold text-indigo-600">Mentor me.</h1>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-indigo-500">Sign Out</a>
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
            <span>Availability</span>
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

