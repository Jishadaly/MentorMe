import React, { useEffect, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import UserDetails from "./UserDetails"; // Import UserDetails component
import { getApplicationMentores } from "@/Api/services/adminServices";

// const users = [
//   { id: 1, name: "John Doe", email: "john@example.com", jobTitle: "Software Engineer", company: "Tech Co" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", jobTitle: "Product Manager", company: "Product Co" },
//   { id: 3, name: "Sam Johnson", email: "sam@example.com", jobTitle: "Designer", company: "Design Co" },
//   // Add more users as needed
// ];

function VerificationRequests() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users , setUsers] = useState([]);

  useEffect(()=>{
    const getUsers = async()=>{
      const response  = await getApplicationMentores('admin/getVerificationMentors');
      
      setUsers(response.datas)
    }
    getUsers()
  },[])

  console.log("users",users);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  if (selectedUser) {
    return <UserDetails user={selectedUser} onBackClick={handleBackClick} />;
  }

  return (
    
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-start px-8 py-4 bg-gray-100">
        <h1 className="text-4xl font-black mb-4 font-sans">Verification Requests</h1>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-4xl p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <li key={user.id} className="py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="w-12 h-12 rounded-full" src={`https://i.pravatar.cc/150?img=${user.id}`} alt={`${user.name} image`} />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">{user.jobTitle} at {user.company}</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <button onClick={() => handleUserClick(user)} className="text-indigo-700 hover:text-indigo-900 transition duration-300">
                        <HiOutlineEye className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default VerificationRequests;
