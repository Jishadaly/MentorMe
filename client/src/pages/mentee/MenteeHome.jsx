import React, { useState , useEffect} from 'react';

import { getMentors  } from '@/Api/services/mentorServices';
import Sidenav from './partials/Sidenav';
import Header from './partials/Header';
import { useNavigate } from 'react-router-dom';

const MenteeHome = () => {
 

  const  [mentors , setMentor ] = useState([]);
  const navigate = useNavigate()

  useEffect(()=>{
    const getUsers = async()=>{
      const response  = await getMentors('user/getMentors');
      setMentor(response.data.mentors)
      console.log(response.data.mentors);
    }
    getUsers();
  },[])

  const handleCardClick = (mentorId) =>{
    navigate(`/mentee/mentorDetails/${mentorId}`);
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
        <section className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-5xl font-extrabold font-inter">Build with the<br />best</h1>
          </div>
          <div className="flex mb-6 items-center">
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-full shadow-md focus:outline-none mr-4 " 
              placeholder="Search creators..." 
            />
            <button className="px-4 py-2  text-indigo-500 border border-indigo-500 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-50 hover:text-indigo-500">
              Filter
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
  {mentors.map((mentor, index) => (
    <div  key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center">
      <img src={`https://randomuser.me/api/portraits/men/${index}.jpg`} alt="profile" className="w-24 h-24 bg-gray-300 rounded-full mb-4" />
      <h2 className="text-lg font-bold font-inter text-center mb-1">{mentor.userName}</h2>
      <div className="flex items-center ">
      <p className="text-gray-500 mb-4 text-center">{mentor.mentorAdditional.jobTitle}</p>
      </div>
      
      <p className="text-gray-700 mb-4 text-center">
  {mentor.mentorAdditional.programmingLanguages.slice(0, 3).join(', ')}
  {mentor.mentorAdditional.programmingLanguages.length > 3 ? ', etc.' : ''}
</p>
      <button onClick={()=>handleCardClick(mentor.mentorAdditional._id)} className="px-4 py-2 bg-white text-indigo-500 border border-indigo-500 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white">
        explore
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