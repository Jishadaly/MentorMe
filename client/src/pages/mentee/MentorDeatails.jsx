import React, { useEffect, useState } from 'react';
import { FiStar, FiCalendar as FiCalendarIcon ,FiDollarSign } from 'react-icons/fi';
import Header from './partials/Header';
import Sidenav from './partials/Sidenav'; 
import { useParams } from 'react-router-dom';
import { fetchMentorData  , slotBookingbyMentee , createCheckoutSession} from '@/Api/services/menteeService';
import CustomDatePicker from '@/componets/DatePicker';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import BookingConfirmModal from '@/componets/modal/BookingConfrimModal';




const MentorDetails = () => {
  const {mentorId} = useParams();
  const [mentor1 , setMentor] = useState(null);
  const [selectedDate , setSelectedDate] = useState(new Date());
  const [slots , setSlots          ] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const amount = 2000;
  const [isModalvisible , setIsmodalVisble] = useState(false);

  
  useEffect(() => {
    const getMentor = async () => {
      try {
        const response = await fetchMentorData('/user/getMentor', mentorId);
        setMentor(response.data.mentor);
        setSlots(response.data.mentor.availabilities);
        console.log(response.data.mentor.availabilities);
        
      } catch (error) {
        console.error(error); 
      }
    }
    getMentor()
  }, [mentorId]);
  if (!mentor1) {
    
    return <div>Loading...</div>;
  }

  const filterSlotsByDate = (date) => {
    return slots.filter((slot)=> new Date(slot.date).toDateString() === date.toDateString())
  };

  const availableSlots = filterSlotsByDate(selectedDate);

  // const handleBooking = async (slotId , index)=>{
  //    try {
  //       const menteeId = user.id;
  //       const bookingDatas = {
  //         menteeId , mentorId , slotId
  //       }
  //       const response = slotBookingbyMentee('/user/slotBooking',bookingDatas);
  //       console.log("mkmkmkmk",response);
  //       toast.success("Slot booked successfully");
  //       let amount = 500;
  //       const strip = await stripePromise;
  //       const session = await createCheckoutSession('/user/create-checkout-session' ,amount , menteeId , mentorId , slotId )
  //       .then((res) => res.json());
        
  //       await strip.redirectToCheckout({sessionId:session.id});
  //    } catch (error) {
  //     console.log(error);
  //    }
  // }

  // const makePayment = async(slotId , index)=>{
   
  //   const menteeId = user.id;
  //   try {
  //     const strip =  loadStripe(import.meta.env.VITE_STRIP_PUBLISHED_KEY);
  //     const session = await createCheckoutSession('/user/create-checkout-session' ,{amount: amount,
  //     menteeId: menteeId,
  //     mentorId: mentorId,
  //     slotId: slotId} )
  //       .then((res) => res.json()).catch((error)=> console.log(error))

  //       await strip.redirectToCheckout({sessionId:session.id});

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleButtonClick = ()=>{
    setIsmodalVisble(true);
  }

  const handleModalClose = ()=>{
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
    <div className="flex min-h-screen bg-gray-100">
      
      <Header />
      <Sidenav />
      
      <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-6">
              <img src={mentor.profilePicture} alt="profile" className="w-24 h-24 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold font-inter">{mentor1.name}</h2>
                <p className="text-gray-500 font-inter" >{mentor1.jobTitle}</p>
                <div className="flex items-center text-green-500">
                  <FiStar size={20} />
                  <span className="ml-1 font-semibold">{mentor.rating} ({mentor.sessions}+ sessions)</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 font-inter">About</h3>
              <p className="text-gray-700 mb-4 whitespace-pre-wrap font-inter">{mentor1.bio}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 font-inter">Experience</h3>
              {mentor.experience.map((item, index) => (
                <div key={index} className="mb-4">
                  <p className="font-bold font-inter">{item.title}</p>
                  <p className="text-gray-700 font-inter">{item.description}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 font-inter ">Skills</h3>
              <p className="text-gray-700 font-inter">{mentor1.programmingLanguages.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 font-inter ">language preference</h3>
              <p className="text-gray-700 font-inter">{mentor1.languagePreference.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 font-inter">Reviews</h3>
              {mentor.reviews.map((review, index) => (
                <div key={index} className="mb-4">
                  <p className="font-bold font-inter">{review.name}</p>
                  <div className="flex items-center text-green-500">
                    <FiStar size={20} />
                    <span className="ml-1 font-inter">{review.rating}</span>
                  </div>
                  <p className="text-gray-700 font-inter">{review.comment}</p>
                </div>
              ))}
              <button className="px-4 py-2 bg-white text-indigo-500 border border-indigo-500 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white">
                Read all reviews
              </button>
            </div>
          </div>

           {/* Booking Calendar */}
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
              <span className="ml-1 font-semibold font-inter">${mentor1.rate} / 30-minute call</span>
              <a href="#" className="text-blue-500 ml-2 underline">extend to 60min</a>
            </div>
            <div>
              <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2  text-white font-inter">Available time</h4>
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot, index) => (
                    <button onClick={handleButtonClick } key={index} className="flex-shrink-0 font-inter px-4 py-2 bg-indigo-500 text-white rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-600">
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
      { isModalvisible && <BookingConfirmModal onClose = {handleModalClose} /> }
    </div>
  );
};

export default MentorDetails;



