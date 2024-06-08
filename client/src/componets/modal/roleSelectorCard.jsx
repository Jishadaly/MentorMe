import React from 'react'
import { useNavigate , useParams } from 'react-router-dom'


function RoleSelectorCard() {
  const navigate = useNavigate();
  const { userId} = useParams()
  console.log("userId with use params" , userId);
  return (
    <div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=> navigate(`/mentorAppForm/${userId.toString()}`)} >become a mentor</button> <br /> <br />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=> navigate(`/menteeAppForm/${userId.toString()}`)} >become a mentee</button>
    </div>
  )
}

export default RoleSelectorCard
