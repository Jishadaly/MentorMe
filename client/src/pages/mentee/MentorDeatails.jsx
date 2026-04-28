// import React, { useEffect, useState } from 'react';
// import { FiStar, FiCalendar as FiCalendarIcon, FiDollarSign } from 'react-icons/fi';
// import { useParams } from 'react-router-dom';
// import { fetchMentorData, getMentorReviwes } from '@/Api/services/menteeService';
// import CustomDatePicker from '@/componets/DatePicker';
// import { useSelector } from 'react-redux';
// import BookingConfirmModal from '@/componets/modal/BookingConfrimModal';
// import { FaBriefcase , FaGlobe} from 'react-icons/fa';

// const MentorDetails = () => {

//   const { mentorId } = useParams();
//   const [mentor1, setMentor] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [slots, setSlots] = useState([]);
//   const [clickedSLot, setClickedSlot] = useState(null);
//   const user = useSelector((state) => state.auth.user);
//   const [isModalvisible, setIsmodalVisble] = useState(false);
//   const [reviews, setReviews] = useState([]);

//   const fetchReviwes = async () => {
//     try {
//       const fetchedReviews = await getMentorReviwes('user/getMentorReview', mentorId);
//       setReviews(fetchedReviews);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     const getMentor = async () => {
//       try {
//         const response = await fetchMentorData('/user/getMentor', mentorId);
//         setMentor(response.data.mentor);
//         setSlots(response.data.mentor.availabilities);
//         console.log(response.data.mentor);

//       } catch (error) {
//         console.error({ error });
//       }
//     }
//     getMentor();
//     fetchReviwes();
//   }, [mentorId]);
//   if (!mentor1) {
//     return console.log("mentor is comming");
//   }

//   const filterSlotsByDate = (date) => {
//     return slots.filter((slot) => new Date(slot.date).toDateString() === date.toDateString())
//   };

//   const availableSlots = filterSlotsByDate(selectedDate);

//   const handleButtonClick = (slotId) => {
//     setClickedSlot(slotId)
//     setIsmodalVisble(true);
//   }

//   const handleModalClose = () => {
//     setIsmodalVisble(false)
//   }

//   const mentor = {
//     profilePicture: `https://randomuser.me/api/portraits/men/42.jpg`,
//     name: 'Meghan Watkins',
//     jobTitle: 'Full Stack Developer',
//     rating: 5.0,
//     sessions: 150,
//     about: `Co-founder of Victory Wine Group, one of the fastest growing wine distributors in the country, Meghan helped the business scale and expand into FL, AZ and NM and had a successful exit when they reached over $100MM. Now a strategic business coach working with CEOs and their leadership teams. Her mentor approach focuses on helping you become a great leader, clarifying your vision on where you want to go and how to get there, building an extraordinary team, and implementing systems to achieve big results. She has worked with a lot of the top success brands on MentorPass including Nutri, Grinds, EcommerceRx, Brass Clothing and many more.`,
//     experience: [
//       { title: 'Exited second business at $100MM', description: 'Grew Victory Wine Group in Texas to over $100MM in 7 years with over 120 employees. Grew Polara Beverage Company to $100MM+ and had a successful exit at the beginning of 2022.' }
//     ],
//     skills: ['Java', 'DSA', 'OOP', 'System Design', 'Java Springboot', 'Git', 'APIs', 'JCI', 'JOP', 'Distributed Systems'],
//     reviews: [
//       { name: 'Thomas', rating: 5, comment: 'In just a 30-minute call with Meghan Watkins, her profound expertise in exit strategies was immediately evident. Her insights were invaluable in helping us orient our company towards being exit-ready. Meghan’s ability to quickly grasp our situation and provide targeted, strategic advice was remarkable. Her seasoned perspective on preparing businesses for successful transitions is a rare find. This initial session was not only enlightening but also a testament to her exceptional capability as a strategic advisor in the realm of business exits.' }
//     ],
//     rate: '$252',
//     availableTimes: ['6:30pm', '7:00pm', '7:30pm']
//   };

//   return (
//     <div className="flex min-h-screen ">
//       <main className="sm:ml-20  md:mt-36    flex-1 overflow-y-auto">
//         <section className="  max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 ">
//             <div className="flex items-center space-x-4 mb-6">
//               <img src={mentor1.user.profilePic} alt="profile" className="w-24 h-24 rounded-full" />
//               <div>
//                 <h2 className="text-2xl font-bold font-inter">{mentor1.name}</h2>
//                 <p className="text-gray-500 font-inter" >{mentor1.jobTitle}</p>
//                 <div className="flex items-center text-green-500">
//                   <FiStar size={20} />
//                   <span className="ml-1 font-semibold">{mentor.rating} ({mentor.sessions}+ sessions)</span>
//                 </div>
//               </div>
//             </div>

//             <div className='mt-10'>
//               <h3 className="text-xl font-bold mb-2 font-inter">About</h3>
//               <p className="text-gray-700 mb-4 whitespace-pre-wrap font-inter">{mentor1.bio}</p>
//             </div>

//             <div className='mt-10'>
//               <h3 className="text-xl font-extrabold mb-2 font-inter">Experience</h3>
//               {mentor.experience.map((item, index) => (
//                 <div key={index} className="mb-4 flex items-start">
//                   <div className="p-4 rounded-lg bg-gray-900 flex items-center justify-center mr-3">
//                     <FaBriefcase className="text-indigo-500" size={20} /> 
//                   </div>
//                   <div>
//                     <p className="font-bold font-inter">{item.title}</p>
//                     <p className="text-gray-700 font-inter">{item.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className='mt-10'>
//               <h3 className="text-xl font-bold mb-2 font-inter">Skills</h3>
//               <div className="text-gray-700 font-inter flex items-center">
//                 <div className="p-4 rounded-lg bg-gray-900 flex items-center justify-center mr-3">
//                   <FaBriefcase className="text-indigo-500" size={20} />
//                 </div>
//                 <p>{mentor1.programmingLanguages.join(', ')}</p>
//               </div>
//             </div>

//             <div className='mt-10'>
//               <h3 className="text-xl font-bold mb-2 font-inter">language preference</h3>
//               <div className="text-gray-700 font-inter flex items-center">
//                 <div className="p-4 rounded-lg bg-gray-900 flex items-center justify-center mr-3">
//                   <FaGlobe className="text-indigo-500" size={20} />
//                 </div>
//                 <p className="text-gray-700 font-inter">{mentor1.languagePreference.join(', ')}</p>
//               </div>
//             </div>

//             <div className='mt-10'>
//               <h3 className="text-xl font-bold mb-2 font-inter">Reviews</h3>
//               {reviews && reviews.map((review, index) => (
//                 <div key={index} className="mb-4">
//                   <div className="flex items-center text-gray-900 text-4xl h-16">
                  
//                     <span className="ml-1 font-inter font-bold ">{review.rating}</span>
//                   </div>
//                   <p className=" font-inter text-gray-800">{review.menteeId.userName}</p>
                  
//                   <p className="text-gray-700 font-inter">{review.comments}</p>
//                 </div>
//               ))}

//               {reviews.length > 0 ? (
//                 <button className="px-4 py-2 bg-white text-indigo-500 border border-indigo-500 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white">
//                   Read all reviews
//                 </button>
//               ) : (
//                 <div className="text-gray-500 ">
//                   <p className='font-inter'>No reviews yet. Be the first to leave a review!</p>
//                 </div>
//               )}

//             </div>
//           </div>

         
//           <div className="bg-gray-900 p-6 rounded-lg shadow-md h-auto sticky top-16">
//             <h3 className="text-xl font-bold mb-4 text-white font-inter">Book with {mentor1.name.split(' ')[0]}</h3>
//             <div className="text-gray-300 mb-4">
//               <p>Times in GMT+5:30 (current time {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</p>
//             </div>
//             <div className="flex items-center text-green-500 mb-4">
//               <FiStar size={20} />
//               <span className="ml-1 font-semibold font-inter">{mentor1.rating} ({mentor1.sessions}+ sessions)</span>
//             </div>
//             <div className="text-green-500 mb-4 flex items-center">
//               <FiDollarSign size={20} />
//               <span className="ml-1 font-semibold font-inter">${mentor1.rate}2000 / 60-minute call</span>
//               {/* <a href="#" className="text-blue-500 ml-2 underline">extend to 60min</a> */}
//             </div>
//             <div>
//               <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-2  text-white font-inter">Available time</h4>
//               <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
//                 {availableSlots.length > 0 ? (
//                   availableSlots.filter(slot => !slot.isBooked)
//                     .map((slot, index) => (
//                       <button onClick={() => handleButtonClick(slot)} key={index} className="flex-shrink-0 font-inter px-4 py-2 bg-indigo-500 text-white rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-600">
//                         {`${new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
//                       </button>
//                     ))
//                 ) : (
//                   <p className="text-gray-500 font-inter">No available slots for this date.</p>
//                 )}


//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       {isModalvisible && <BookingConfirmModal onClose={handleModalClose} mentorData={mentor1} mentee={user.id} slot={clickedSLot} price={2000} />}
//     </div>
//   );
// };

// export default MentorDetails;



import React, { useEffect, useState } from 'react';
import { FiStar, FiDollarSign, FiClock, FiCalendar, FiAward, FiGlobe, FiCode } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { fetchMentorData, getMentorReviwes } from '@/Api/services/menteeService';
import CustomDatePicker from '@/componets/DatePicker';
import { useSelector } from 'react-redux';
import BookingConfirmModal from '@/componets/modal/BookingConfrimModal';

const MentorDetails = () => {
  const { mentorId } = useParams();
  const [mentor1, setMentor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [clickedSLot, setClickedSlot] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [isModalvisible, setIsmodalVisble] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  const fetchReviwes = async () => {
    try {
      const fetchedReviews = await getMentorReviwes('user/getMentorReview', mentorId);
      setReviews(fetchedReviews);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getMentor = async () => {
      try {
        const response = await fetchMentorData('/user/getMentor', mentorId);
        setMentor(response.data.mentor);
        setSlots(response.data.mentor.availabilities);
      } catch (error) {
        console.error({ error });
      }
    }
    getMentor();
    fetchReviwes();
  }, [mentorId]);

  if (!mentor1) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const filterSlotsByDate = (date) => {
    return slots.filter((slot) => new Date(slot.date).toDateString() === date.toDateString())
  };

  const availableSlots = filterSlotsByDate(selectedDate);

  const handleButtonClick = (slotId) => {
    setClickedSlot(slotId)
    setIsmodalVisble(true);
  }

  const handleModalClose = () => {
    setIsmodalVisble(false)
  }

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img 
                  src={mentor1.user.profilePic} 
                  alt="profile" 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-indigo-100 object-cover" 
                />
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{mentor1.name}</h1>
                  <p className="text-gray-600 mt-1">{mentor1.jobTitle}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <div className="flex items-center text-amber-500">
                      <FiStar className="fill-amber-500" size={18} />
                      <span className="ml-1 font-semibold text-gray-900">{mentor1.rating}</span>
                      <span className="ml-1 text-gray-500 text-sm">({mentor1.sessions}+ sessions)</span>
                    </div>
                    <div className="flex items-center text-indigo-600">
                      <FiDollarSign size={18} />
                      <span className="font-semibold">${mentor1.rate}/hr</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-6 bg-indigo-600 rounded-full mr-3"></span>
                About
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {showFullBio ? mentor1.bio : `${mentor1.bio.substring(0, 300)}...`}
              </p>
              {mentor1.bio.length > 300 && (
                <button 
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="text-indigo-600 hover:text-indigo-700 font-medium mt-3 text-sm"
                >
                  {showFullBio ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-6 bg-indigo-600 rounded-full mr-3"></span>
                Skills & Expertise
              </h2>
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0">
                  <FiCode size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {mentor1.programmingLanguages.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Languages Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-6 bg-indigo-600 rounded-full mr-3"></span>
                Languages
              </h2>
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0">
                  <FiGlobe size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">{mentor1.languagePreference.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-6 bg-indigo-600 rounded-full mr-3"></span>
                Reviews ({reviews.length})
              </h2>
              
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {displayedReviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                            {review.menteeId.userName.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{review.menteeId.userName}</h3>
                            <div className="flex items-center text-amber-500">
                              <FiStar className="fill-amber-500" size={16} />
                              <span className="ml-1 font-semibold text-sm">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{review.comments}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {reviews.length > 2 && (
                    <button 
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="w-full py-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                      {showAllReviews ? 'Show less reviews' : `View all ${reviews.length} reviews`}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <FiStar size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-6 sticky top-20 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-white">Book a Session</h3>
              
              {/* Current Time */}
              <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                <p className="text-gray-300 text-sm flex items-center">
                  <FiClock className="mr-2" size={16} />
                  Current time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center text-amber-400 mb-1">
                    <FiStar className="fill-amber-400 mr-1" size={16} />
                    <span className="font-semibold">{mentor1.rating}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{mentor1.sessions}+ sessions</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center text-green-400 mb-1">
                    <FiDollarSign className="mr-1" size={16} />
                    <span className="font-semibold">${mentor1.rate}</span>
                  </div>
                  <p className="text-gray-400 text-xs">60-min call</p>
                </div>
              </div>

              {/* Date Picker */}
              <div className="mb-6">
                <label className="text-white font-semibold mb-3 block flex items-center">
                  <FiCalendar className="mr-2" size={18} />
                  Select Date
                </label>
                <CustomDatePicker 
                  selectedDate={selectedDate} 
                  setSelectedDate={setSelectedDate} 
                />
              </div>

              {/* Available Slots */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <FiClock className="mr-2" size={18} />
                  Available Times
                </h4>
                
                {availableSlots.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                    {availableSlots
                      .filter(slot => !slot.isBooked)
                      .map((slot, index) => (
                        <button 
                          onClick={() => handleButtonClick(slot)} 
                          key={index} 
                          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium transition-all duration-200 hover:bg-indigo-500 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center"
                        >
                          <FiClock className="mr-2" size={16} />
                          {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {' - '}
                          {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </button>
                      ))}
                  </div>
                ) : (
                  <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                    <FiCalendar className="mx-auto mb-3 text-gray-500" size={32} />
                    <p className="text-gray-400 text-sm">No available slots for this date.</p>
                    <p className="text-gray-500 text-xs mt-2">Try selecting another date</p>
                  </div>
                )}
              </div>

              {/* Info Text */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-xs text-center">
                  ✨ All times shown in your local timezone (GMT+5:30)
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isModalvisible && (
        <BookingConfirmModal 
          onClose={handleModalClose} 
          mentorData={mentor1} 
          mentee={user.id} 
          slot={clickedSLot} 
          price={2000} 
        />
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.7);
        }
      `}</style>
    </div>
  );
};

export default MentorDetails;