import React, { useEffect, useState } from 'react'
import Header from './partials/Header'
import Sidenav from './partials/Sidenav'
import { fetchBookedSlotes } from '@/Api/services/menteeService';
import { useSelector } from 'react-redux';

function CallesPage() {
  const user = useSelector((state)=> state.auth.user);
  const [bookedSLotes , setBookedSlotes] = useState([]);

  useEffect(()=>{
    const fetchSlotes = async ()=>{
       const slotes = await fetchBookedSlotes('user/getBookedSlotes',user.id)
       setBookedSlotes(slotes.slotes)
    }
    fetchSlotes()
  },[])

  console.log(bookedSLotes);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Header />
      <Sidenav />
      <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
        <div className="flex flex-col space-y-6">
          {/* Date Section */}
          <div className="text-center text-gray-500">
            <h2>19-05-2024 | Monday</h2>
          </div>
          {/* Call Items */}
          <div className="space-y-4">
            <div className="bg-indigo-600 text-white rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl">Full Stack</h3>
                <p>06:10 PM - 07:30 PM</p>
                <button className="bg-indigo-300 text-white px-4 py-2 rounded mt-2 hover:bg-indigo-400">Join</button>
              </div>
              <div>
                <p className="text-right">Kathryn Cooper</p>
                <p className="text-right text-sm">HR Manager</p>
                <p className="text-right text-sm">5.0</p>
              </div>
            </div>
            <div className="bg-blue-600 text-white rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl">Web Dev</h3>
                <p>06:10 PM - 07:30 PM</p>
                <button className="bg-blue-800 text-white px-4 py-2 rounded mt-2">Join</button>
              </div>
              <div>
                <p className="text-right">Kathryn Cooper</p>
                <p className="text-right text-sm">HR Manager</p>
                <p className="text-right text-sm">5.0</p>
              </div>
            </div>
          </div>

          {/* Another Date Section */}
          <div className="text-center text-gray-500">
            <h2>20-06-2024 | Monday</h2>
          </div>
          {/* More Call Items */}
          <div className="space-y-4">
            <div className="bg-blue-600 text-white rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl">React Basics</h3>
                <p>03:55 PM - 04:30 PM</p>
                <button className="bg-blue-800 text-white px-4 py-2 rounded mt-2">Join</button>
              </div>
              <div>
                <p className="text-right">Kathryn Cooper</p>
                <p className="text-right text-sm">HR Manager</p>
                <p className="text-right text-sm">5.0</p>
              </div>
            </div>
            <div className="bg-blue-600 text-white rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl">Nest.js</h3>
                <p>08:10 PM - 07:30 PM</p>
                <button className="bg-blue-800 text-white px-4 py-2 rounded mt-2">Join</button>
              </div>
              <div>
                <p className="text-right">Kathryn Cooper</p>
                <p className="text-right text-sm">HR Manager</p>
                <p className="text-right text-sm">5.0</p>
              </div>
            </div>
          </div>

          {/* No Upcoming Calls Section */}
          {/* <div className="bg-white rounded-lg p-6 text-center shadow-lg">
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
            <h3 className="text-xl font-semibold">You have no upcoming calls</h3>
            <p className="text-gray-500">Your video calls will appear here after booking a time with your mentor.</p>
            <button className="bg-black text-white px-4 py-2 rounded mt-4">Book a Mentor</button>
          </div> */}
        </div>
      </main>
    </div>
  )
}

export default CallesPage
