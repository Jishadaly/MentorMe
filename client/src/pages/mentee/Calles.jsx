import React, { useEffect, useState } from 'react'
import Header from './partials/Header'
import Sidenav from './partials/Sidenav'
import { fetchBookedSlotes } from '@/Api/services/menteeService';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { startChat } from '@/Api/services/chatServices';
import { useChat } from '@/Context/chatContext';


export default function CallesPage() {
  const navigate = useNavigate();
  const user = useSelector((state)=> state.auth.user);
  const [bookedSLotes , setBookedSlotes] = useState([]);
  const { setChatId } = useChat();

  useEffect(()=>{
    const fetchSlotes = async ()=>{
       const slotes = await fetchBookedSlotes('user/getBookedSlotes',user.id);
       console.log(slotes);
       setBookedSlotes(slotes.slotes)
    }
    fetchSlotes()
  },[])



  const handleMessageBtn = async(mentorId)=>{
      console.log(mentorId);
      const chatId = await startChat('chat/startChat',mentorId , user.id);
      console.log("chat ss",chatId);
      setChatId(chatId._id);
      navigate(`/mentee/chat`);
    
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Header />
      <Sidenav />
      <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
        <div className="flex flex-col space-y-6">
          {bookedSLotes < 0 && <h3 className="text-2xl font-extrabold font-inter mb-4">Upcoming Sessions</h3>  }
        
          {bookedSLotes.length > 0 ? (
            bookedSLotes.map((slot) => (
              <div key={slot._id} className="bg-indigo-600 text-white rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-xl">Full Stack</h3>
                  <p>{moment(slot.startTime).format('MMMM Do YYYY')}</p>
                  <p>{moment(slot.startTime).format('h:mm a')} - {moment(slot.endTime).format('h:mm a')}</p>
                  <button className="bg-indigo-300 text-white px-4 py-2 rounded mt-2 hover:bg-indigo-400 mr-2">Join</button>
                  <button onClick={()=> handleMessageBtn(slot.mentorId) } className="bg-indigo-300 text-white px-4 py-2 rounded mt-2 hover:bg-indigo-400">message</button>

                </div>
                <div>
                  {/* <p className="text-right">{slot.userName}</p>
                  <p className="text-right text-sm">{slot.mentorId.jobTitle}</p> */}
                  <p className="text-right text-sm">5.0</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <div className="flex justify-center items-center mb-4">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.553-4.553A9.969 9.969 0 0012 2.059c-1.414 0-2.753.276-3.947.778L12 8h8v2l-3.14-1.88A9.98 9.98 0 0115 10z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold font-inter">You have no upcoming calls</h3>
              <p className="text-gray-500 font-inter">Your video calls will appear here after booking a time with your mentor.</p>
              <button onClick={()=> navigate('/mentee/home')} className="bg-black text-white px-4 py-2 font-inter  mt-4"> Book a Mentor </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

 
