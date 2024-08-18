import React from 'react';

function MentorModal({ isVisible, onClose, mentors }) {
  if (!isVisible || mentors.length === 0) return null;

  const mentors1 = [
    {
      id: 1,
      name: 'John Doe',
      company: 'Acme Inc.',
      skills: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
      rating: 4.2,
      profilePic: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      company: 'Globex Corporation',
      skills: ['Design', 'UX', 'Figma', 'Photoshop'],
      rating: 4.7,
      profilePic: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      company: 'Stark Industries',
      skills: ['Python', 'Django', 'SQL', 'AWS'],
      rating: 5.0,
      profilePic: '/placeholder.svg',
    },
    {
      id: 4,
      name: 'Alice Williams',
      company: 'Umbrella Corporation',
      skills: ['Blockchain', 'Solidity', 'Ethereum', 'Web3'],
      rating: 4.5,
      profilePic: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      company: 'Stark Industries',
      skills: ['Python', 'Django', 'SQL', 'AWS'],
      rating: 5.0,
      profilePic: '/placeholder.svg',
    },
    {
      id: 4,
      name: 'Alice Williams',
      company: 'Umbrella Corporation',
      skills: ['Blockchain', 'Solidity', 'Ethereum', 'Web3'],
      rating: 4.5,
      profilePic: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      company: 'Stark Industries',
      skills: ['Python', 'Django', 'SQL', 'AWS'],
      rating: 5.0,
      profilePic: '/placeholder.svg',
    },
    {
      id: 4,
      name: 'Alice Williams',
      company: 'Umbrella Corporation',
      skills: ['Blockchain', 'Solidity', 'Ethereum', 'Web3'],
      rating: 4.5,
      profilePic: '/placeholder.svg',
    },
    
  ];


  return (
    <div className="bg-white rounded-lg p-4 shadow-lg w-full max-h-64 overflow-y-auto border border-gray-300">
      <div className="space-y-4">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center">
              <img
                src={mentor.profilePic || '/default-profile.png'} // Fallback for missing profile pic
                alt={mentor.userName}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3 className="text-sm font-semibold">{mentor.userName}</h3>
                <p className="text-xs text-gray-600">
                  {mentor.mentorAdditional?.jobTitle || 'Job Title not listed'}
                </p>
                <p className="text-xs text-gray-600">
                  {mentor.mentorAdditional?.company || 'Company not listed'}
                </p>
                <p className="text-xs text-gray-600">
                  {mentor.mentorAdditional?.skills?.slice(0, 4).join(', ') || 'No skills listed'}
                </p>
              </div>
            </div>
            <button
              onClick={() => alert(`Viewing ${mentor.userName}`)}
              className="text-indigo-500 hover:text-indigo-700 text-sm"
            >
              View
            </button>
          </div>
        ))}
      </div>

      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white w-[800px] max-h-[600px] overflow-auto rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <input
                type="search"
                placeholder="Search profiles..."
                className="border px-4 py-2 rounded flex-1 max-w-lg"
              />
              <button className="ml-4 text-gray-600">
                <SearchIcon />
              </button>
            </div>
            {mentors1.map((mentor) => (
              <div key={mentor.id} className="flex items-start gap-6 mb-4 border-b pb-4">
                <img
                  src={mentor.profilePic}
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-primary"
                  style={{ aspectRatio: "100/100", objectFit: "cover" }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-semibold">{mentor.name}</div>
                      <div className="text-sm text-gray-600">{mentor.company}</div>
                    </div>
                    <button className="text-gray-600">
                      <ArrowRightIcon />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    {mentor.skills.join(', ')}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={i < mentor.rating ? "fill-primary" : "fill-gray-300"} />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">({mentor.rating})</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}

export default MentorModal;


function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function StarIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}