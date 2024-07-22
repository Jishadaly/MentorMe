import React from 'react'

export default function ProfileCard({ index , profilePicture,name , jobTitle , programmingLanguages , mentorAdditionalId , handleCardClick}) {
    return (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center">
                    <img
                      src={profilePicture}
                      alt="profile"
                      className="w-24 h-24 bg-gray-300 rounded-full mb-4"
                    />
                    <h2 className="text-lg font-bold font-inter text-center mb-1">{name}</h2>
                    <div className="flex items-center">
                      <p className="text-gray-500 mb-4 text-center">{jobTitle}</p>
                    </div>
                    <p className="text-gray-700 mb-4 text-center">
                      {programmingLanguages.slice(0, 3).join(', ')}
                      {programmingLanguages > 3 ? ', etc.' : ''}
                    </p>
                    <button
                      onClick={() => handleCardClick(mentorAdditionalId)}
                      className="px-4 py-2 bg-white text-indigo-500 border border-indigo-500 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white"
                    >
                      Explore
                    </button>
         </div>
    )
}
