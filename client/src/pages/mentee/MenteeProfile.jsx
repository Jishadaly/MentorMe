import React, { useEffect, useState } from 'react';
import Sidenav from './partials/Sidenav';
import Header from './partials/Header';
import EditNameCard from '@/componets/editMenteeProfile/EditNameCard';
import Email from '@/componets/editMenteeProfile/Email';
import { getMentee } from '@/Api/services/menteeService';
import { useDispatch, useSelector } from 'react-redux';
import Phone from '@/componets/editMenteeProfile/Phone';
import ReserPassword from '@/componets/editMenteeProfile/ResetPassord';
import { logout } from '@/redux/slice/userAuthSlice';
import { useNavigate } from 'react-router-dom';

const MenteeProfile = () => {
  const [mentee, setMentee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeField, setActiveField] = useState('name');

  const user = useSelector((state) => state.auth.user);


  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = ()=>{
     dispatch(logout());
     navigate('/mentee/login');
     persistor.purge();
     localStorage.clear(); 
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMentee('user/getMentee', user.id);
        setMentee(response); // Adjust this based on your actual response structure
      } catch (err) {
        console.error('Error fetching mentee:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user.id]);

  if(mentee) console.log(mentee.phone);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleActiveField = (field) => {
    setActiveField(field);
  };
  
  const handleFieldUpdate = (field,newValue )=>{
    console.log(field , "new vakue : ", newValue);
    setMentee((prevMentee) => ({ ...prevMentee, [field]: newValue }));
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">
        <section className="max-w-7xl mx-auto items-center">
          <div className="flex flex-col justify-center flex-start p-5 ">
            <div className='bg-grey flex flex-row'>
              <img className="mr-2 rounded-full w-24 h-24 mb-4" src="https://via.placeholder.com/150" alt="Profile" />
              <div className='flex flex-col'>
                <h2 className="text-xl font-bold font-inter">{mentee.userName}</h2>
                <a href="#edit-profile-picture" className="text-blue-500">Edit profile picture</a>
                <p className="text-gray-500">signed up • 6 days ago</p>
              </div>
            </div>

            <div className='flex flex-row md:flex-row justify-between items-start  bg-gray-100 min-h-screen space-y-6 md:space-y-0 md:space-x-6 w-full'>
              <div className="bg-white p-2 rounded-3xl shadow-md w-full md:w-1/2 flex flex-col items-center">
                <div className="mt-4 w-full">
                  <div className="flex items-center py-2 cursor-pointer" onClick={() => handleActiveField('name')}>
                    <span className="w-8 text-center">🏷️</span>
                    <span>Name: {mentee.userName}</span>
                  </div>
                  <div className="flex items-center py-2 cursor-pointer" onClick={() => handleActiveField('email')}>
                    <span className="w-8 text-center">📧</span>
                    <span>Email: {mentee.email}</span>
                  </div>
                  <div className="flex items-center py-2 cursor-pointer" onClick={() => handleActiveField('phone')}>
                    <span className="w-8 text-center">📱</span>
                    <span>Mobile number: {mentee.phone}</span>
                  </div>
                  {/* <div className="flex items-center py-2 cursor-pointer">
                    <span className="w-8 text-center">🔔</span>
                    <span>Notifications</span>
                  </div> */}
                  <div className="flex items-center py-2 cursor-pointer"onClick={() => handleActiveField('password')}>
                    <span className="w-8 text-center">🔑</span>
                    <span>Password</span>
                  </div>
                  {/* <div className="flex items-center py-2 cursor-pointer">
                    <span className="w-8 text-center">⚠️</span>
                    <span>Danger zone</span>
                  </div> */}
                  <div className="flex items-center py-2 cursor-pointer">
                    <span className="w-8 text-center">🚪</span>
                    <span onClick={handleLogout}>Log out</span>
                  </div>
                </div>
              </div>

              <div className="  rounded-3xl   md:w-2/3">
                {activeField === 'name' && <EditNameCard name={mentee.userName} menteeId = {mentee._id} onUpdate ={handleFieldUpdate} />}
                {activeField === 'email' && <Email email={mentee.email} />}
                {activeField === 'phone' && <Phone phoneNo={mentee.phone} menteeId = {mentee._id}  onUpdate={handleFieldUpdate} />}
                {activeField === 'password' && <ReserPassword  menteeId = {mentee._id}  />}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MenteeProfile;