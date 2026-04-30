// import React from 'react'

// export default function ProfileCard({ index , profilePicture,name , jobTitle ,company ,programmingLanguages , mentorAdditionalId , handleCardClick}) {
//     return (
//         <div key={index} className="bg-white p-6 rounded-3xl shadow-sm flex flex-col items-center ">
//                     <img
//                       src={profilePicture}
//                       alt="profile"
//                       className="w-24 h-24 bg-gray-300 rounded-full mb-4"
//                     />
//                     <h2 className="text-lg font-bold font-inter text-center mb-1">{name}</h2>
//                     <div className="flex items-center">
//                       <p className="text-gray-500 mb-4 text-center font-inter">{jobTitle} at <span className='text-gray-800 font-inter'>{company}</span> </p>
//                     </div>
//                     <p className="text-gray-700 mb-10 text-center">
//                       {programmingLanguages.slice(0, 3).join(', ')}
//                       {programmingLanguages > 3 ? ', etc.' : ''}
//                     </p>
//                     <button
//                       onClick={() => handleCardClick(mentorAdditionalId)}
//                       className="px-4 py-2 font-inter text-gray-200-500 border border-gray-300 rounded-full  transition duration-300 ease-in-out hover:border-indigo-400 hover:text-indigo-500"
//                     >
//                       Learn more
//                     </button> 
//               </div>
//     )
// }


// ============================================
// 2. ProfileCard.jsx - Enhanced Design
// ============================================
import React from 'react';
import { FiStar, FiDollarSign, FiAward, FiTrendingUp } from 'react-icons/fi';

export default function ProfileCard({ 
  profilePicture, 
  name, 
  jobTitle, 
  company, 
  programmingLanguages, 
  mentorAdditionalId, 
  rating = 4.8,
  sessions = 0,
  rate = 0,
  handleCardClick 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Card Header with Gradient */}
      <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <img
              src={profilePicture}
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
            />
            {sessions > 50 && (
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center border-2 border-white">
                <FiAward className="text-white" size={16} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="pt-16 px-6 pb-6">
        {/* Name and Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-1">
          {jobTitle}
        </p>
        <p className="text-gray-500 text-sm mb-4">
          at <span className="font-semibold text-gray-700">{company}</span>
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1 text-amber-500">
            <FiStar className="fill-amber-500" size={16} />
            <span className="font-semibold text-gray-900">{rating}</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <FiTrendingUp size={16} />
            <span>{sessions}+ sessions</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {programmingLanguages.slice(0, 3).map((lang, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
              >
                {lang}
              </span>
            ))}
            {programmingLanguages.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                +{programmingLanguages.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-1 text-indigo-600 font-semibold">
            <FiDollarSign size={18} />
            <span>${rate}/hr</span>
          </div>
          <button
            onClick={() => handleCardClick(mentorAdditionalId)}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
