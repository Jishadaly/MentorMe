

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function RoleSelectorCard() {
  const navigate = useNavigate();
  const { userId } = useParams();
  
  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
        <div className="text-left text-white max-w-md p-8">
          <h1 className="text-3xl font-extrabold font-sans mb-6">Choose your role </h1>
          <div className="flex flex-col items-start gap-6">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-48"
              onClick={() => navigate(`/mentorAppForm/${userId.toString()}`)}
            >
              Become a Mentor
            </button>
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 w-48"
              onClick={() => navigate('/mentee/login')}
            >
              Become a Mentee
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex items-center justify-center p-10">
        <div className="max-w-md">
          <h2 className="text-2xl font-extrabold mb-4 font-sans">Instructions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sl font-extrabold font-sans">For Mentors</h3>
              <p className="text-gray-600  font-extralight">
                As a mentor, you will be guiding and supporting mentees through their career development. You will share your expertise, provide feedback, and help them achieve their goals.
              </p>
              <ul className="list-disc list-inside text-gray-600 font-sans">
                <li>Share your knowledge</li>
                <li>Provide constructive feedback</li>
                <li>Help mentees set and achieve goals</li>
              </ul>
              <a href="#" className="text-indigo-600 hover:underline mt-2 block">Learn more about mentoring</a>
            </div>
            <div>
              <h3 className="text-sl font-extrabold font-sans">For Mentees</h3>
              <p className="text-gray-600 mb-2">
                As a mentee, you will have the opportunity to learn from experienced mentors. You will receive valuable guidance, feedback, and support to help you advance in your career.
              </p>
              <ul className="list-disc list-inside text-gray-600">
                <li>Gain insights from experts</li>
                <li>Receive personalized guidance</li>
                <li>Accelerate your career growth</li>
              </ul>
              <a href="#" className="text-indigo-600 hover:underline mt-2 block">Learn more about being a mentee</a>
            </div>
            <div>
              <h3 className="text-sl font-extrabold font-sans">Resources</h3>
              <p className="text-gray-600 mb-2">Check out these resources to get started:</p>
              <ul className="list-disc list-inside text-gray-600">
                <li><a href="#" className="text-indigo-600 hover:underline">Mentor Handbook</a></li>
                <li><a href="#" className="text-indigo-600 hover:underline">Mentee Guide</a></li>
                <li><a href="#" className="text-indigo-600 hover:underline">Best Practices</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelectorCard;
