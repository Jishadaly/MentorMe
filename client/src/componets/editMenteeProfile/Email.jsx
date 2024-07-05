import React, { useEffect, useState } from 'react'

function Email({email}) {
  const [userEmail , setUserEmail] = useState(null);
  const handleChange = (e) => setUserName(e.target.value);
  useEffect(()=> {
    setUserEmail(email);
  },[])
  console.log(userEmail);
  return (
    <div className="bg-white p-6 rounded-3xl shadow-md w-full md:w-1/1 border-solid border-3 border-black">
                            <h3 className="text-xl font-bold font-inter mb-4">Update email</h3>
                            <p className="text-gray-500 mb-4">Your email address is never displayed or shared with
                            anyone, it helps us keep your account secure.</p>
                            <div className="mb-4">
                                <label className="block text-gray-700">email</label>
                                <input 
                                    type="text" 
                                    value={userEmail }  
                                    onChange={handleChange} 
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

export default Email
