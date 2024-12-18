import React, { useEffect, useState } from 'react';
import { FiStar, FiCalendar as FiCalendarIcon, FiDollarSign } from 'react-icons/fi';
import Header from './partials/Header';
import Sidenav from './partials/Sidenav';
import { useParams } from 'react-router-dom';
import { fetchMentorData, getMentorReviwes } from '@/Api/services/menteeService';
import CustomDatePicker from '@/componets/DatePicker';
import { useSelector } from 'react-redux';
import BookingConfirmModal from '@/componets/modal/BookingConfrimModal';
import { FaCode } from 'react-icons/fa';
import { FaBriefcase , FaGlobe} from 'react-icons/fa';

const MentorDetails = () => {

  const { mentorId } = useParams();
  const [mentor1, setMentor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [clickedSLot, setClickedSlot] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [isModalvisible, setIsmodalVisble] = useState(false);
  const [reviews, setReviews] = useState([]);

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
        console.log(response.data.mentor);

      } catch (error) {
        console.error({ error });
      }
    }
    getMentor();
    fetchReviwes();
  }, [mentorId]);
  if (!mentor1) {
    return console.log("mentor is comming");
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

  const mentor = {
    profilePicture: `https://randomuser.me/api/portraits/men/42.jpg`,
    name: 'Meghan Watkins',
    jobTitle: 'Full Stack Developer',
    rating: 5.0,
    sessions: 150,
    about: `Co-founder of Victory Wine Group, one of the fastest growing wine distributors in the country, Meghan helped the business scale and expand into FL, AZ and NM and had a successful exit when they reached over $100MM. Now a strategic business coach working with CEOs and their leadership teams. Her mentor approach focuses on helping you become a great leader, clarifying your vision on where you want to go and how to get there, building an extraordinary team, and implementing systems to achieve big results. She has worked with a lot of the top success brands on MentorPass including Nutri, Grinds, EcommerceRx, Brass Clothing and many more.`,
    experience: [
      { title: 'Exited second business at $100MM', description: 'Grew Victory Wine Group in Texas to over $100MM in 7 years with over 120 employees. Grew Polara Beverage Company to $100MM+ and had a successful exit at the beginning of 2022.' }
    ],
    skills: ['Java', 'DSA', 'OOP', 'System Design', 'Java Springboot', 'Git', 'APIs', 'JCI', 'JOP', 'Distributed Systems'],
    reviews: [
      { name: 'Thomas', rating: 5, comment: 'In just a 30-minute call with Meghan Watkins, her profound expertise in exit strategies was immediately evident. Her insights were invaluable in helping us orient our company towards being exit-ready. Meghan’s ability to quickly grasp our situation and provide targeted, strategic advice was remarkable. Her seasoned perspective on preparing businesses for successful transitions is a rare find. This initial session was not only enlightening but also a testament to her exceptional capability as a strategic advisor in the realm of business exits.' }
    ],
    rate: '$252',
    availableTimes: ['6:30pm', '7:00pm', '7:30pm']
  };

  return (
    <div className="flex min-h-screen ">
      <main className="sm:ml-20  md:mt-36    flex-1 overflow-y-auto">
        <section className="  max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 ">
            <div className="flex items-center space-x-4 mb-6">
              <img src={mentor1.user.profilePic} alt="profile" className="w-24 h-24 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold font-inter">{mentor1.name}</h2>
                <p className="text-gray-500 font-inter" >{mentor1.jobTitle}</p>
                <div className="flex items-center text-green-500">
                  <FiStar size={20} />
                  <span className="ml-1 font-semibold">{mentor.rating} ({mentor.sessions}+ sessions)</span>
                </div>
              </div>
            </div>

            <div className='mt-10'>
              <h3 className="text-xl font-bold mb-2 font-inter">About</h3>
              <p className="text-gray-700 mb-4 whitespace-pre-wrap font-inter">{mentor1.bio}</p>
            </div>

            <div className='mt-10'>
              <h3 className="text-xl font-extrabold mb-2 font-inter">Experience</h3>
              {mentor.experience.map((item, index) => (
                <div key={index} className="mb-4 flex items-start">
                  <div className="p-4 rounded-lg bg-gray-900 flex items-center justify-center mr-3">
                    <FaBriefcase className="text-indigo-500" size={20} /> 
                  </div>
                  <div>
                    <p className="font-bold font-inter">{item.title}</p>
                    <p className="text-gray-700 font-inter">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-10'>
              <h3 className="text-xl font-bold mb-2 font-inter">Skills</h3>
              <div className="text-gray-700 font-inter flex items-center">
                <div className="p-4 rounded-lg bg-gray-900 flex items-center justify-center mr-3">
                  <FaBriefcase className="text-indigo-500" size={20} />
                </div>
                <p>{mentor1.programmingLanguages.join(', ')}</p>
              </div>
            </div>

            <div className='mt-10'>
              <h3 className="text-xl font-bold mb-2 font-inter">language preference</h3>
              <div className="text-gray-700 font-inter flex items-center">
                <div className="p-4 rounded-lg bg-gray-900 flex items-center justify-center mr-3">
                  <FaGlobe className="text-indigo-500" size={20} />
                </div>
                <p className="text-gray-700 font-inter">{mentor1.languagePreference.join(', ')}</p>
              </div>
            </div>

            <div className='mt-10'>
              <h3 className="text-xl font-bold mb-2 font-inter">Reviews</h3>
              {reviews && reviews.map((review, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center text-gray-900 text-4xl h-16">
                  
                    <span className="ml-1 font-inter font-bold ">{review.rating}</span>
                  </div>
                  <p className=" font-inter text-gray-800">{review.menteeId.userName}</p>
                  
                  <p className="text-gray-700 font-inter">{review.comments}</p>
                </div>
              ))}

              {reviews.length > 0 ? (
                <button className="px-4 py-2 bg-white text-indigo-500 border border-indigo-500 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white">
                  Read all reviews
                </button>
              ) : (
                <div className="text-gray-500 ">
                  <p className='font-inter'>No reviews yet. Be the first to leave a review!</p>
                </div>
              )}

            </div>
          </div>

         
          <div className="bg-gray-900 p-6 rounded-lg shadow-md h-auto sticky top-16">
            <h3 className="text-xl font-bold mb-4 text-white font-inter">Book with {mentor1.name.split(' ')[0]}</h3>
            <div className="text-gray-300 mb-4">
              <p>Times in GMT+5:30 (current time {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</p>
            </div>
            <div className="flex items-center text-green-500 mb-4">
              <FiStar size={20} />
              <span className="ml-1 font-semibold font-inter">{mentor1.rating} ({mentor1.sessions}+ sessions)</span>
            </div>
            <div className="text-green-500 mb-4 flex items-center">
              <FiDollarSign size={20} />
              <span className="ml-1 font-semibold font-inter">${mentor1.rate}2000 / 60-minute call</span>
              {/* <a href="#" className="text-blue-500 ml-2 underline">extend to 60min</a> */}
            </div>
            <div>
              <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2  text-white font-inter">Available time</h4>
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {availableSlots.length > 0 ? (
                  availableSlots.filter(slot => !slot.isBooked)
                    .map((slot, index) => (
                      <button onClick={() => handleButtonClick(slot)} key={index} className="flex-shrink-0 font-inter px-4 py-2 bg-indigo-500 text-white rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-600">
                        {`${new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                      </button>
                    ))
                ) : (
                  <p className="text-gray-500 font-inter">No available slots for this date.</p>
                )}


              </div>
            </div>
          </div>
        </section>
      </main>
      {isModalvisible && <BookingConfirmModal onClose={handleModalClose} mentorData={mentor1} mentee={user.id} slot={clickedSLot} price={2000} />}
    </div>
  );
};

export default MentorDetails;



