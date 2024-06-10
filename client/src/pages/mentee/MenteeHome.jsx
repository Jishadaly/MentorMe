import React, { useState , useEffect} from 'react';
import { FiUser, FiBell, FiHome, FiCompass, FiBook, FiMessageSquare, FiCalendar, FiVideo, FiMoreHorizontal } from 'react-icons/fi'; // React icons for navigation
import { HiOutlineSearch } from 'react-icons/hi';
import { getMentors  } from '@/Api/services/mentorServices';


const MenteeHome = () => {
 

  const  [mentors , setMentor ] = useState([]);

  useEffect(()=>{
    const getUsers = async()=>{
      const response  = await getMentors('user/getMentors');
      setMentor(response.data.mentors)
      console.log(response.data.mentors);
    }
    getUsers()
  },[])

  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full fixed top-0 bg-white p-4 shadow-md flex justify-between items-center z-10">
        <h1 className="text-2xl font-extrabold text-black-600 font-sans">Mentor me.</h1>
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
          <FiUser size={24} className="text-gray-700" />
        </div>
      </header>

      {/* Sidebar */}
      <aside className="w-20 fixed top-16 bottom-0 left-0 bg-white shadow-md flex flex-col items-center pt-6 z-10">
        <nav className="flex flex-col items-center space-y-6">
          <a href="#" className="text-indigo-500"><FiHome size={24} /></a>
          <a href="#" className="text-indigo-500"><FiCompass size={24} /></a>
          <a href="#" className="text-indigo-500"><FiBook size={24} /></a>
          <a href="#" className="text-indigo-500"><FiMessageSquare size={24} /></a>
          <a href="#" className="text-indigo-500"><FiCalendar size={24} /></a>
          <a href="#" className="text-indigo-500"><FiVideo size={24} /></a>
          <a href="#" className="text-indigo-500"><FiMoreHorizontal size={24} /></a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
        <section className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-5xl font-extrabold font-sans">Build with the<br />best</h1>
          </div>
          <div className="flex mb-6 items-center">
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-full shadow-md focus:outline-none mr-4" 
              placeholder="Search creators..." 
            />
            <button className="px-4 py-2  text-indigo-500 border border-indigo-500 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-50 hover:text-indigo-500">
              Filter
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cards */}
            {mentors.map((mentor, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                <div className="flex items-center space-x-4 mb-4">
                  <img src={`https://randomuser.me/api/portraits/men/${index}.jpg`} alt="profile" className="w-16 h-16 bg-gray-300 rounded-full" />
                  <div>
                    <h2 className="text-lg font-semibold">{mentor.name}</h2>
                    <p className="text-gray-500">{mentor.jobTitle}</p>
                  </div>
                </div>
                <p className="mb-4 text-gray-700">
                  company: {mentor.company}
                </p>
                <p className="mb-4 text-gray-700">
                  expertise: {mentor.programmingLanguages[0]}
                </p>
                <button className="px-4 py-2 bg-white text-indigo-500 border border-indigo-500 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white">
                  View
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MenteeHome;
