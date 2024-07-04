import React, { useEffect, useState } from 'react';
import Sidenav from './partials/Sidenav';
import Header from './partials/Header';
import EditNameCard from '@/componets/EditNameCard';
import { getMentee } from '@/Api/services/menteeService';
import { useSelector } from 'react-redux';

const MenteeProfile = () => {
  const [firstName, setFirstName] = useState('jishad');
  const [lastName, setLastName] = useState('ali');

  const user = useSelector((state)=> state.auth.user)
  console.log(user);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const [mentee ,setMentee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMentee('user/getMentee', user.id);
        console.log("mentee:", response);
        setMentee(response); // Adjust this based on your actual response structure
      } catch (err) {
        console.error("Error fetching mentee:", err);
        setError("Failed to load mentee data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user.id]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      {/* Sidebar */}
      <Sidenav />
      {/* Main Content */}
      <main className="ml-20 mt-16 p-6 flex-1 overflow-y-auto">

        <section className="max-w-7xl mx-auto items-center">

          <div className="flex flex-col justify-center items-center p-5">

            <div className='bg-grey flex flex-row  '>
              <img className="mr-2 rounded-full w-24 h-24 mb-4" src="https://via.placeholder.com/150" alt="Profile" />
              <div className='flex flex-col'>
                <h2 className="text-xl font-bold font-inter">{mentee.userName}</h2>
                <a href="#edit-profile-picture" className="text-blue-500">Edit profile picture</a>
                <p className="text-gray-500">signed up • 6 days ago</p>
              </div>

            </div>


            <div className='flex flex-row md:flex-row justify-center items-start p-5 bg-gray-100 min-h-screen space-y-6 md:space-y-0 md:space-x-6'>

              <div className="bg-white p-2 rounded-3xl shadow-md w-full  md:w-1/2 flex flex-col items-start">

                <div className="mt-4 w-full">
                  <div className="flex items-center py-2"><span className="w-8 text-center">🏷️</span> <span>Name: {mentee.userName}</span></div>
                  <div className="flex items-center py-2"><span className="w-8 text-center">📧</span> <span>Email: {mentee.email}</span></div>
                  <div className="flex items-center py-2"><span className="w-8 text-center">📱</span> <span>Mobile number: {mentee.phone}</span></div>
                  <div className="flex items-center py-2"><span className="w-8 text-center">🔔</span> <span>Notifications</span></div>
                  <div className="flex items-center py-2"><span className="w-8 text-center">🔑</span> <span>Password</span></div>
                  <div className="flex items-center py-2"><span className="w-8 text-center">⚠️</span> <span>Danger zone</span></div>
                  <div className="flex items-center py-2"><span className="w-8 text-center">🚪</span> <span>Log out</span></div>
                </div>
              </div>

              <EditNameCard name={mentee.userName}/>


            </div>






          </div>
        </section>
      </main>
    </div>
  );
};

export default MenteeProfile;
