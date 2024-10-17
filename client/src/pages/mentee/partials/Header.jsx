// import React from 'react'
// import { FiUser, FiBell, FiHome, FiCompass, FiBook, FiMessageSquare, FiCalendar, FiVideo, FiMoreHorizontal } from 'react-icons/fi'; // React icons for navigation
// import { HiOutlineSearch } from 'react-icons/hi';
// import { useNavigate } from 'react-router-dom';

// function Header() {
//   const navigate = useNavigate()
//   return (
//       <header className="w-full fixed top-0 bg-white p-4 shadow-md flex justify-between items-center z-10">
//         <div>
//         <h1 className="text-2xl font-extrabold text-black-600 font-inter">mentor me.</h1>
//         </div>
//         <div>
//           <div className="flex items-center bg-gray-200 rounded-full shadow-md">
//             <input 
//               type="text" 
//               className="w-full px-4 py-2 rounded-l-full focus:outline-none" 
//               placeholder="Search creators..." 
//             />
//             <button className="p-2  text-indigo-500">
//               <HiOutlineSearch size={24} />
//             </button>
//           </div>
//           </div>
//         <div className="flex items-center space-x-4">
//           <FiBell onClick={()=> navigate('/mentee/notifications')} size={24} className="text-gray-700 cursor-pointer" />
//            {/* <FiUser size={24} className="text-gray-700" /> */} 
//         </div>
//       </header>
    
//   )
// }

// export default Header;

import React, { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import { HiOutlineSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import MentorModal from '../../../componets/modal/MentorModal';
import { searchMentors } from '../../../Api/services/menteeService';

function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Debounced search function
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        setIsModalVisible(true);
        setLoading(true);
        
        searchMentors('user/searchMentors',searchQuery)
          .then((data) => {
            console.log(data)
            setFilteredMentors(data); 
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching mentors:', error);
            setLoading(false);
          });
      } else {
        setIsModalVisible(false);
      }
    }, 1000);
    
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]); 

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <header className="w-full fixed top-0 bg-white p-4 shadow-md flex justify-between items-center z-10">
        <div>
          <h1 className="text-2xl font-extrabold text-black-600 font-inter">mentor me.</h1>
        </div>
        <div className="relative">
          <div className="flex items-center bg-gray-200 rounded-full shadow-md">
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-l-full focus:outline-none" 
              placeholder="Search creators..." 
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="p-2 text-indigo-500">
              <HiOutlineSearch size={24} onClick={()=> setIsModalVisible(true)} />
            </button>
          </div>
          {/* Modal is now positioned below the search input */}
          {isModalVisible && (
            <div className="absolute top-full left-0 w-full">
              <MentorModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                mentors={filteredMentors}
                loading={loading} // Pass loading state to modal
              />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <FiBell onClick={() => navigate('/mentee/notifications')} size={24} className="text-gray-700 cursor-pointer" />
        </div>
      </header>
    </>
  );
}

export default Header;