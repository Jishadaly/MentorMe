import React from 'react'

export default function ProfileCard({ index , profilePicture,name , jobTitle ,company ,programmingLanguages , mentorAdditionalId , handleCardClick}) {
    return (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center">
                    <img
                      src={profilePicture}
                      alt="profile"
                      className="w-24 h-24 bg-gray-300 rounded-full mb-4"
                    />
                    <h2 className="text-lg font-bold font-inter text-center mb-1">{name}</h2>
                    <div className="flex items-center">
                      <p className="text-gray-500 mb-4 text-center font-inter">{jobTitle} at <span className='text-gray-800 font-inter'>{company}</span> </p>
                    </div>
                    <p className="text-gray-700 mb-10 text-center">
                      {programmingLanguages.slice(0, 3).join(', ')}
                      {programmingLanguages > 3 ? ', etc.' : ''}
                    </p>
                    <button
                      onClick={() => handleCardClick(mentorAdditionalId)}
                      className="px-4 py-2 font-inter text-gray-200-500 border border-gray-300 rounded-full  transition duration-300 ease-in-out hover:border-indigo-400 hover:text-indigo-500"
                    >
                      Learn more
                    </button> 
              </div>
    )
}
