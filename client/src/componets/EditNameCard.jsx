import React, { useEffect, useState } from 'react'

function EditNameCard({name}) {
  const [userName , setUserName] = useState(null);
  const handleFirstNameChange = (e) => setUserName(e.target.value);
  useEffect(()=> {
    setUserName(name)
  },[])
  console.log(userName);
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md w-full md:w-1/2 border-solid border-3 border-black">
                            <h3 className="text-xl font-bold font-inter mb-4">Update name</h3>
                            <p className="text-gray-500 mb-4">Your name is only visible to the people you communicate with.</p>
                            <div className="mb-4">
                                <label className="block text-gray-700">First name</label>
                                <input 
                                    type="text" 
                                    value={userName }  
                                    onChange={handleFirstNameChange} 
                                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                                />
                            </div>
                            <button 
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded "
                                disabled
                            >
                                Save
                            </button>
                        </div>
  )
}

export default EditNameCard
