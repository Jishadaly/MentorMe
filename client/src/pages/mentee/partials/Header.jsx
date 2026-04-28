

// import React, { useState, useEffect } from 'react';
// import { FiBell } from 'react-icons/fi';
// import { HiOutlineSearch } from 'react-icons/hi';
// import { useNavigate } from 'react-router-dom';
// import MentorModal from '../../../componets/modal/MentorModal';
// import { searchMentors } from '../../../Api/services/menteeService';

// function Header() {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredMentors, setFilteredMentors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Debounced search function
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchQuery.trim()) {
//         setIsModalVisible(true);
//         setLoading(true);
        
//         searchMentors('user/searchMentors',searchQuery)
//           .then((data) => {
//             console.log(data)
//             setFilteredMentors(data); 
//             setLoading(false);
//           })
//           .catch((error) => {
//             console.error('Error fetching mentors:', error);
//             setLoading(false);
//           });
//       } else {
//         setIsModalVisible(false);
//       }
//     }, 1000);
    
//     return () => clearTimeout(delayDebounceFn);
//   }, [searchQuery]); 

//   const handleInputChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCloseModal = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <>
//       <header className="w-full fixed top-0 bg-white p-4 shadow-md flex justify-between items-center z-10">
//         <div>
//           <h1 className="text-2xl font-extrabold text-black-600 font-inter">mentor me.</h1>
//         </div>
//         <div className="relative">
//           <div className="flex items-center bg-gray-200 rounded-full shadow-md">
//             <input 
//               type="text" 
//               className="w-full px-4 py-2 rounded-l-full focus:outline-none" 
//               placeholder="Search creators..." 
//               value={searchQuery}
//               onChange={handleInputChange}
//             />
//             <button className="p-2 text-indigo-500">
//               <HiOutlineSearch size={24} onClick={()=> setIsModalVisible(true)} />
//             </button>
//           </div>
//           {/* Modal is now positioned below the search input */}
//           {isModalVisible && (
//             <div className="absolute top-full left-0 w-full">
//               <MentorModal
//                 isVisible={isModalVisible}
//                 onClose={handleCloseModal}
//                 mentors={filteredMentors}
//                 loading={loading} // Pass loading state to modal
//               />
//             </div>
//           )}
//         </div>
//         <div className="flex items-center space-x-4">
//           <FiBell onClick={() => navigate('/mentee/notifications')} size={24} className="text-gray-700 cursor-pointer" />
//         </div>
//       </header>
//     </>
//   );
// }

// export default Header;



// ============================================
// 2. Header.jsx - Responsive Header
// ============================================
import React, { useState, useEffect } from 'react';
import { FiBell, FiMenu, FiX } from 'react-icons/fi';
import { HiOutlineSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import MentorModal from '../../../componets/modal/MentorModal';
import { searchMentors } from '../../../Api/services/menteeService';

function Header({ onMenuToggle }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        setIsModalVisible(true);
        setLoading(true);
        
        searchMentors('user/searchMentors', searchQuery)
          .then((data) => {
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
      <header className="w-full fixed top-0 bg-white shadow-sm flex justify-between items-center z-50 px-4 lg:px-6 h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl lg:text-2xl font-bold text-indigo-600">mentor me.</h1>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex relative flex-1 max-w-xl mx-4">
          <div className="flex items-center bg-gray-100 rounded-full w-full hover:bg-gray-200 transition-colors">
            <input 
              type="text" 
              className="w-full px-4 py-2 bg-transparent rounded-l-full focus:outline-none text-sm" 
              placeholder="Search mentors..." 
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="p-2 pr-4 text-indigo-600">
              <HiOutlineSearch size={20} />
            </button>
          </div>
          
          {isModalVisible && (
            <div className="absolute top-full left-0 w-full mt-2 z-50">
              <MentorModal
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                mentors={filteredMentors}
                loading={loading}
              />
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Mobile Search Toggle */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <HiOutlineSearch size={22} />
          </button>

          {/* Notification Bell */}
          <button 
            onClick={() => navigate('/mentee/notifications')}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <FiBell size={22} />
            {/* Optional notification badge */}
            {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
          </button>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchExpanded && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg p-4 z-40 animate-slideDown">
          <div className="relative">
            <div className="flex items-center bg-gray-100 rounded-full">
              <input 
                type="text" 
                className="w-full px-4 py-2.5 bg-transparent rounded-l-full focus:outline-none text-sm" 
                placeholder="Search mentors..." 
                value={searchQuery}
                onChange={handleInputChange}
                autoFocus
              />
              <button 
                className="p-2 pr-4 text-indigo-600"
                onClick={() => setIsSearchExpanded(false)}
              >
                <FiX size={20} />
              </button>
            </div>
            
            {isModalVisible && (
              <div className="absolute top-full left-0 w-full mt-2">
                <MentorModal
                  isVisible={isModalVisible}
                  onClose={() => {
                    handleCloseModal();
                    setIsSearchExpanded(false);
                  }}
                  mentors={filteredMentors}
                  loading={loading}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
