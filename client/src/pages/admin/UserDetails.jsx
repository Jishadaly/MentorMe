import React from "react";
import { RiArrowGoBackLine } from "react-icons/ri"; // Import the back icon
import { toast } from "sonner";
import { verifyApplication ,rejectApplication } from "@/Api/services/adminServices";


function UserDetails({ user, onBackClick }) {
  console.log(user);

   const handleVerify = async(userId)=>{
    alert(userId)
     try {
       const response = await verifyApplication('admin/verifyMentorRequest',userId);
       console.log(response);
       toast.success(response.data.message);
       onBackClick()

     } catch (error) {
      console.log(error);
      toast.error(error.error);
     }
   }

   const handleRejection = async (userId) => {
    if (!window.confirm("Are you sure you want to reject this application?")) {
      return; 
    }
    
    try {
      const response = await rejectApplication('admin/rejectMentorApplication', userId);
      toast.success(response.data.message);
      onBackClick(); 
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-100 relative">
      <div className="flex items-start mb-0 ml-5 mt-2"> {/* Adjusted to align items at the start */}
        <button onClick={onBackClick} className="text-gray-700 hover:text-gray-900">
          <RiArrowGoBackLine className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute top-2 right-4 text-gray-700">
        submitted Since: {new Date(user.createdAt).toLocaleDateString()}
      </div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6 sticky top-4">
              <div className="flex flex-col items-center">
                <img src={`https://i.pravatar.cc/150?img=${user.id}`} alt="User Avatar" className="w-32 h-32 bg-gray-300 rounded-full mb-4" />
                <h1 className="text-xl font-bold">{user.name}</h1>
                <p className="text-gray-700">{user.jobTitle}</p>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <button onClick={()=>handleRejection(user._id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Reject</button>
                  <button onClick={()=> handleVerify(user._id)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Verify</button>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />
              <div className="flex flex-col">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Skills</span>
                <ul>
                  {user.skills && user.skills.map((skill, index) => (
                    <li key={index} className="mb-2">{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <div className="mb-4">
                <p className="text-gray-700">{user.bio}</p>
              </div>
              <div className="mb-4">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Job Title</span>
                <p className="text-black-700">{user.jobTitle}</p>
              </div>
              <div className="mb-4">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Company</span>
                <p className="text-black-700">{user.company}</p>
              </div>
              <div className="mb-4">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Location</span>
                <p className="text-black-700">{user.location}</p>
              </div>
              <div className="mb-4">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Programming Languages</span>
                <ul>
                  {user.programmingLanguages && user.programmingLanguages.map((language, index) => (
                    <li key={index} className="text-black-700 mb-2">{language}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Language Preference</span>
                <ul>
                  {user.languagePreference && user.languagePreference.map((language, index) => (
                    <li key={index} className="text-black-700 mb-2">{language}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">LinkedIn Profile</span>
                <p className="text-blue-700 hover:underline"><a href={user.linkedInProfile} target="_blank" rel="noopener noreferrer">{user.linkedInProfile}</a></p>
              </div>
              <div className="mb-4">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Motivation</span>
                <p className="text-black-700">{user.motivation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
