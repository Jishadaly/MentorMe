// import React, { useEffect, useState } from 'react'
// import Header from './partials/Header'
// import Sidenav from './partials/Sidenav'
// import { fetchBookedSlotes } from '@/Api/services/menteeService';
// import { useSelector } from 'react-redux';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import { startChat } from '@/Api/services/chatServices';
// import { useChat } from '@/Context/chatContext';
// import Feedback from '@/componets/modal/FeedbackModal';
// import { TickIcon } from '@/componets/icons/chatIcons';

// export default function CallesPage() {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user);
//   const [bookedSLotes, setBookedSlotes] = useState([]);
//   const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
//   const [selectedSLotId , setSelectedSlotId] = useState('')
//   const [ selectedMentorId , setSelectedMentorId ]= useState('');
//   const { setChatId } = useChat();

//   useEffect(() => {
//     const fetchSlotes = async () => {
//       const slotes = await fetchBookedSlotes('user/getBookedSlotes', user.id);
//       console.log(slotes);
//       setBookedSlotes(slotes.slotes)
//     }
//     fetchSlotes()
//   }, [])



//   const handleMessageBtn = async (mentorId) => {
//     console.log(mentorId);
//     const chatId = await startChat('chat/startChat', mentorId, user.id);
//     console.log("chat ss", chatId);
//     setChatId(chatId._id);
//     navigate(`/mentee/chat`);

//   }

//   const handleJoinButton = (meetId) => {
//     navigate(`/meet/${meetId}`);
//   };

//   const handleFeedbackButton = (slotId , mentorId) => {
//     setSelectedSlotId(slotId);
//     setSelectedMentorId(mentorId);
//     setIsFeedbackOpen(true)
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
//         <div className="flex flex-col space-y-6">
//           {bookedSLotes.length < 0 && <h3 className="text-2xl font-extrabold font-inter mb-4">Upcoming Sessions</h3>}

//           {bookedSLotes.length > 0 ? (
//             bookedSLotes.map((slot) => (
//               <div key={slot._id} className="bg-indigo-600 text-white rounded-lg p-4 flex justify-between items-center">
//                 <div>
//                   <h3 className="text-xl">Full Stack</h3>
//                   <p>{moment(slot.startTime).format('MMMM Do YYYY')}</p>
//                   <p>{moment(slot.startTime).format('h:mm a')} - {moment(slot.endTime).format('h:mm a')}</p>
//                   <button
//                     onClick={() => handleJoinButton(slot.roomId)}
//                     className={`px-4 py-2 rounded mt-2 mr-2 ${slot.status === 'Completed' ? 'hidden' : 'bg-indigo-300 text-white hover:bg-indigo-400'
//                       }`}
//                     disabled={slot.status === 'Completed'}
//                   >
//                     Join
//                   </button>
//                   {slot.status === 'Completed' && (
//                     <div className="flex items-center px-4 py-2 rounded mt-2 mr-2 bg-green-200 text-green-800">
//                     <TickIcon className="w-6 h-6 mr-2" />
//                     Session Completed
//                   </div>
//                   )}

//                   <button
//                     onClick={() => handleMessageBtn(slot.mentorId)}
//                     className="bg-indigo-300 text-white px-4 py-2 rounded mt-2 hover:bg-indigo-400"
//                   >
//                     Message
//                   </button>
//                   {slot.status === 'Completed' && (
//                     <button
//                       onClick={() => handleFeedbackButton(slot._id , slot.mentorId)}
//                       className="bg-indigo-300 ml-2  text-white px-4 py-2 rounded mt-2 hover:bg-indigo-400"
//                     >
//                       Add feedback
//                     </button>
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-right text-sm">5.0</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="p-6 text-center">
//               <div className="flex justify-center items-center mb-4">
//                 <svg
//                   className="w-12 h-12 text-gray-500"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M15 10l4.553-4.553A9.969 9.969 0 0012 2.059c-1.414 0-2.753.276-3.947.778L12 8h8v2l-3.14-1.88A9.98 9.98 0 0115 10z"
//                   ></path>
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold font-inter">You have no upcoming calls</h3>
//               <p className="text-gray-500 font-inter">Your video calls will appear here after booking a time with your mentor.</p>
//               <button onClick={() => navigate('/mentee/home')} className="bg-black text-white px-4 py-2 font-inter mt-4">Book a Mentor</button>
//             </div>
//           )}
//         </div>
//       </main>
//       {isFeedbackOpen &&
//         <Feedback isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} sessionId={selectedSLotId} mentorId={selectedMentorId} />
//       }
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react'
import Header from './partials/Header'
import Sidenav from './partials/Sidenav'
import { fetchBookedSlotes } from '@/Api/services/menteeService';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { startChat } from '@/Api/services/chatServices';
import { useChat } from '@/Context/chatContext';
import Feedback from '@/componets/modal/FeedbackModal';
import { TickIcon } from '@/componets/icons/chatIcons';
import { Calendar, Clock, MessageCircle, Video, Star, ChevronDown } from 'lucide-react';

export default function CallesPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [bookedSLotes, setBookedSlotes] = useState([]);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [selectedSLotId, setSelectedSlotId] = useState('')
  const [selectedMentorId, setSelectedMentorId] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  const { setChatId } = useChat();

  useEffect(() => {
    const fetchSlotes = async () => {
      const slotes = await fetchBookedSlotes('user/getBookedSlotes', user.id);
      console.log(slotes);
      setBookedSlotes(slotes.slotes)
    }
    fetchSlotes()
  }, [])

  // Separate upcoming and past sessions
  const upcomingSessions = bookedSLotes.filter(slot => slot.status !== 'Completed');
  const pastSessions = bookedSLotes.filter(slot => slot.status === 'Completed');

  const handleMessageBtn = async (mentorId) => {
    console.log(mentorId);
    const chatId = await startChat('chat/startChat', mentorId, user.id);
    console.log("chat ss", chatId);
    setChatId(chatId._id);
    navigate(`/mentee/chat`);
  }

  const handleJoinButton = (meetId) => {
    navigate(`/meet/${meetId}`);
  };

  const handleFeedbackButton = (slotId, mentorId) => {
    setSelectedSlotId(slotId);
    setSelectedMentorId(mentorId);
    setIsFeedbackOpen(true)
  };

  // Session Card Component
  const SessionCard = ({ slot, isUpcoming }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">Full Stack Development</h3>
            {!isUpcoming && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <TickIcon className="w-3 h-3 mr-1" />
                Completed
              </span>
            )}
          </div>
          
          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{moment(slot.startTime).format('MMMM Do, YYYY')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{moment(slot.startTime).format('h:mm A')} - {moment(slot.endTime).format('h:mm A')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-lg">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-medium text-amber-700">5.0</span>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-100">
        {isUpcoming && (
          <button
            onClick={() => handleJoinButton(slot.roomId)}
            className="flex items-center justify-center gap-2 flex-1 bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <Video className="w-4 h-4" />
            Join Session
          </button>
        )}
        
        <button
          onClick={() => handleMessageBtn(slot.mentorId)}
          className={`flex items-center justify-center gap-2 ${isUpcoming ? 'flex-1' : 'flex-1'} bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium`}
        >
          <MessageCircle className="w-4 h-4" />
          Message
        </button>

        {!isUpcoming && (
          <button
            onClick={() => handleFeedbackButton(slot._id, slot.mentorId)}
            className="flex items-center justify-center gap-2 flex-1 bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <Star className="w-4 h-4" />
            Add Feedback
          </button>
        )}
      </div>
    </div>
  );

  // Empty State Component
  const EmptyState = ({ isUpcoming }) => (
    <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 rounded-full p-4">
          <Calendar className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {isUpcoming ? 'No Upcoming Sessions' : 'No Past Sessions'}
      </h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {isUpcoming 
          ? 'Your upcoming video calls will appear here after booking a session with your mentor.' 
          : 'Your completed sessions will appear here.'}
      </p>
      {isUpcoming && (
        <button 
          onClick={() => navigate('/mentee/home')} 
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Book a Mentor
        </button>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Sessions</h1>
          <p className="text-gray-600">Manage your upcoming and past mentoring sessions</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex gap-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'upcoming'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Sessions
              {upcomingSessions.length > 0 && (
                <span className="ml-2 bg-indigo-100 text-indigo-600 py-0.5 px-2.5 rounded-full text-xs font-medium">
                  {upcomingSessions.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'past'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Past Sessions
              {pastSessions.length > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2.5 rounded-full text-xs font-medium">
                  {pastSessions.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'upcoming' ? (
            upcomingSessions.length > 0 ? (
              upcomingSessions.map((slot) => (
                <SessionCard key={slot._id} slot={slot} isUpcoming={true} />
              ))
            ) : (
              <EmptyState isUpcoming={true} />
            )
          ) : (
            pastSessions.length > 0 ? (
              pastSessions.map((slot) => (
                <SessionCard key={slot._id} slot={slot} isUpcoming={false} />
              ))
            ) : (
              <EmptyState isUpcoming={false} />
            )
          )}
        </div>
      </main>

      {isFeedbackOpen && (
        <Feedback 
          isOpen={isFeedbackOpen} 
          onClose={() => setIsFeedbackOpen(false)} 
          sessionId={selectedSLotId} 
          mentorId={selectedMentorId} 
        />
      )}
    </div>
  );
}