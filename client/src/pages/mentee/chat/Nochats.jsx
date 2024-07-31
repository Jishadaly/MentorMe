import React from 'react';

export default function MentorshipProgram() {
  return (
    <div className="flex flex-col items-center w-full justify-center min-h-min bg-gray-100 text-center text-gray-700">
      <div className=" md:max-w-32">
        <img src="https://cdn-icons-png.flaticon.com/512/14/14558.png" alt="Mentorship Illustration" className="mx-auto text-indigo-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-700 font-inter">Mentorship Chat</h1>
      <p className="mt-2 text-gray-500 font-inter">
        Connect with mentors and receive guidance on your personal and professional growth.
      </p>
      <p className="mt-1  text-gray-400 font-inter">Use our platform to chat with mentors and get the support you need.</p>
      <p className="mt-56 text-xs text-gray-700 font-inter">Your conversations are private and secure.</p>
    </div>
  );
}
