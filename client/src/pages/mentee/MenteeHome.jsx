import React, { useState, useEffect } from 'react';
import { getMentors } from '@/Api/services/mentorServices';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '@/componets/ProfileCard';
import SkeletonCard from './home/SkeletonCard';
import Cookies from 'js-cookie';


const MenteeHome = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = Cookies.get('token');
        const response = await getMentors('user/getMentors');

        setTimeout(() => {
          setMentors(response.data.mentors);
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleCardClick = (mentorId) => {
    navigate(`/mentee/mentorDetails/${mentorId}`);
  };

  const filteredMentors = mentors.filter((mentor) => {
    const { userName, mentorAdditional } = mentor;
    const { company, programmingLanguages } = mentorAdditional || {};
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      userName.toLowerCase().includes(lowerCaseSearchTerm) ||
      (company && company.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (programmingLanguages && programmingLanguages.some(lang => lang.toLowerCase().includes(lowerCaseSearchTerm)))
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
        <section className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-5xl font-extrabold font-inter">
              Build with the
              <br />
              best
            </h1>
          </div>
          <div className="flex mb-6 items-center">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-full shadow-md focus:outline-none mr-4"
              placeholder="Search creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="px-4 py-2 text-indigo-500 border border-indigo-500 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-50 hover:text-indigo-500">
              Filter
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: mentors.length ? mentors.length : 3 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
              : filteredMentors.map((mentor, index) => (
                <ProfileCard
                  key={mentor.mentorAdditional._id}
                  company={mentor.mentorAdditional.company}
                  profilePicture={mentor.profilePic}
                  index={index}
                  name={mentor.userName}
                  jobTitle={mentor.mentorAdditional.jobTitle}
                  programmingLanguages={mentor.mentorAdditional.programmingLanguages}
                  mentorAdditionalId={mentor.mentorAdditional._id}
                  handleCardClick={handleCardClick}
                />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MenteeHome;
