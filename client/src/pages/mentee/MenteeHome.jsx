// import React, { useState, useEffect } from 'react';
// import { getMentors } from '@/Api/services/mentorServices';
// import { useNavigate } from 'react-router-dom';
// import ProfileCard from '@/componets/ProfileCard';
// import SkeletonCard from './home/SkeletonCard';


// const MenteeHome = () => {
//   const [mentors, setMentors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getUsers = async () => {
//       try {
//         const response = await getMentors('user/getMentors');

//         setTimeout(() => {
//           setMentors(response.data.mentors);
//           setLoading(false);
//         }, 1500);
//       } catch (err) {
//         console.error('Error fetching mentors:', err);
//         setLoading(false);
//       }
//     };
//     getUsers();
//   }, []);

//   const handleCardClick = (mentorId) => {
//     navigate(`/mentee/mentorDetails/${mentorId}`);
//   };

//   const filteredMentors = mentors.filter((mentor) => {
//     const { userName, mentorAdditional } = mentor;
//     const { company, programmingLanguages } = mentorAdditional || {};
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();

//     return (
//       userName.toLowerCase().includes(lowerCaseSearchTerm) ||
//       (company && company.toLowerCase().includes(lowerCaseSearchTerm)) ||
//       (programmingLanguages && programmingLanguages.some(lang => lang.toLowerCase().includes(lowerCaseSearchTerm)))
//     );
//   });

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <main className="mt-16 p-6 flex-1 overflow-y-auto">
//         <section className="max-w-7xl mx-auto">
//           <div className="mb-6">
//             <h1 className="text-5xl font-extrabold font-inter">
//               Build with the
//               <br />
//               <span className=' from-blue-800 to-purple-700'>

//               best
//               </span>
//             </h1>
//           </div>
//           <div className="flex mb-6 items-center">
//             <input
//               type="text"
//               className="w-full px-4 py-2 rounded-full shadow-md focus:outline-none mr-4"
//               placeholder="Search creators..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button className="px-4 py-2 text-indigo-500 border border-indigo-500 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-50 hover:text-indigo-500">
//               Filter
//             </button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {loading
//               ? Array.from({ length: mentors.length ? mentors.length : 3 }).map((_, index) => (
//                 <SkeletonCard key={index} />
//               ))
//               : filteredMentors.map((mentor, index) => (
//                 <ProfileCard
//                   key={mentor.mentorAdditional._id}
//                   company={mentor.mentorAdditional.company}
//                   profilePicture={mentor.profilePic}
//                   index={index}
//                   name={mentor.userName}
//                   jobTitle={mentor.mentorAdditional.jobTitle}
//                   programmingLanguages={mentor.mentorAdditional.programmingLanguages}
//                   mentorAdditionalId={mentor.mentorAdditional._id}
//                   handleCardClick={handleCardClick}
//                 />
//               ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default MenteeHome;

// ============================================
// 1. MenteeHome.jsx - Complete Redesign
// ============================================
import React, { useState, useEffect } from 'react';
import { getMentors } from '@/Api/services/mentorServices';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '@/componets/ProfileCard';
import SkeletonCard from './home/SkeletonCard';
import FilterPanel from '../others/FilterPanel';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const MenteeHome = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    skills: [],
    companies: [],
    minRating: 0,
    maxPrice: 10000,
    experience: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
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

  // Apply all filters
  const filteredMentors = mentors.filter((mentor) => {
    const { userName, mentorAdditional } = mentor;
    const { company, programmingLanguages, rating, rate } = mentorAdditional || {};
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Search filter
    const matchesSearch = 
      userName.toLowerCase().includes(lowerCaseSearchTerm) ||
      (company && company.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (programmingLanguages && programmingLanguages.some(lang => 
        lang.toLowerCase().includes(lowerCaseSearchTerm)
      ));

    // Skills filter
    const matchesSkills = filters.skills.length === 0 || 
      (programmingLanguages && filters.skills.some(skill => 
        programmingLanguages.includes(skill)
      ));

    // Company filter
    const matchesCompany = filters.companies.length === 0 || 
      filters.companies.includes(company);

    // Rating filter
    const matchesRating = !rating || rating >= filters.minRating;

    // Price filter
    const matchesPrice = !rate || rate <= filters.maxPrice;

    return matchesSearch && matchesSkills && matchesCompany && matchesRating && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Build with the{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                best mentors
              </span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
              Connect with experienced developers and accelerate your learning journey
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                placeholder="Search by name, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 font-medium text-gray-700 hover:text-indigo-600 hover:border-indigo-300"
            >
              <FiFilter size={20} />
              <span>Filters</span>
              {(filters.skills.length > 0 || filters.companies.length > 0) && (
                <span className="ml-1 px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-semibold">
                  {filters.skills.length + filters.companies.length}
                </span>
              )}
            </button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredMentors.length}</span> mentors
            </p>
            {(filters.skills.length > 0 || filters.companies.length > 0 || searchTerm) && (
              <button
                onClick={() => {
                  setFilters({
                    skills: [],
                    companies: [],
                    minRating: 0,
                    maxPrice: 10000,
                    experience: []
                  });
                  setSearchTerm('');
                }}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </section>

        {/* Filter Panel */}
        {isFilterOpen && (
          <FilterPanel 
            mentors={mentors}
            filters={filters}
            setFilters={setFilters}
            onClose={() => setIsFilterOpen(false)}
          />
        )}

        {/* Mentor Grid */}
        <section>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredMentors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor, index) => (
                <ProfileCard
                  key={mentor.mentorAdditional._id}
                  company={mentor.mentorAdditional.company}
                  profilePicture={mentor.profilePic}
                  index={index}
                  name={mentor.userName}
                  jobTitle={mentor.mentorAdditional.jobTitle}
                  programmingLanguages={mentor.mentorAdditional.programmingLanguages}
                  mentorAdditionalId={mentor.mentorAdditional._id}
                  rating={mentor.mentorAdditional.rating}
                  sessions={mentor.mentorAdditional.sessions}
                  rate={mentor.mentorAdditional.rate}
                  handleCardClick={handleCardClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FiSearch className="text-gray-400" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No mentors found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({
                    skills: [],
                    companies: [],
                    minRating: 0,
                    maxPrice: 10000,
                    experience: []
                  });
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MenteeHome;
