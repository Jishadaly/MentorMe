import React, { useEffect, useState } from 'react';
import { fetchAllUsers, fetchAllMentors, updateBlockStatus } from '@/Api/services/adminServices';
import { fetchMentorData } from '@/Api/services/menteeService';

function Users() {
    const [users, setUsers] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [view, setView] = useState('users');

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await fetchAllUsers('admin/getAllUsers');
            const mentorsData = await fetchAllMentors('admin/getAllMentors');
            console.log();
            setUsers(usersData.data.users);
            setMentors(mentorsData.data.Mentors);
        };
        fetchData();
    }, []);

    const toggleBlockStatus = async (id, isBlocked, isMentor) => {
      
            // Make API call to update the blocked status
            const response = await updateBlockStatus('admin/updateBlockStatus', id, !isBlocked);

            if (response) {
                console.log("/////", response);
                if (isMentor) {
                    setMentors(mentors.map(mentor =>
                        mentor._id === id ? { ...mentor, isBlocked: !isBlocked } : mentor));
                } else {
                    setUsers(users.map(user =>
                        user._id === id ? { ...user, isBlocked: !isBlocked } : user));
                }
            }
    };

    const handleAdditionalAction = async (mentorId)=>{
         console.log(mentorId)
        const mentorData = await fetchMentorData 
    }

    return (
        <div>
            <div className="flex  mb-4 ">
                <button
                    className={`px-4 py-2 ${view === 'users' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setView('users')}
                >
                    Users
                </button>
                <button
                    className={`px-4 py-2 ${view === 'mentors' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setView('mentors')}
                >
                    Mentors
                </button>
            </div>

            {view === 'users' ? (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3"> Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Phone</th>
                                <th scope="col" className="px-6 py-3">Blocked</th>
                                <th scope="col" className="px-6 py-3">Action</th>

                                <th scope="col" className="px-6 py-3"><span className="sr-only">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.userName}</th>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.phone}</td>
                                    <td className={`px-6 py-4 ${user.isBlocked ? 'text-red-500' : ''}`}>
                                        {user.isBlocked ? 'Blocked' : 'Unblocked'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => toggleBlockStatus(user._id, user.isBlocked, false)}
                                            className="font-medium text-indigo-600 dark:text-blue-500 hover:underline"
                                        >
                                            {user.isBlocked ? 'Unblock' : 'Block'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3"> Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Phone</th>
                                <th scope="col" className="px-6 py-3">Blocked</th>
                                <th scope="col" className="px-6 py-3"><span>Action</span></th>


                                <th scope="col" className="px-6 py-3"><span className="sr-only">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {mentors.map(mentor => (
                                <tr key={mentor._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{mentor.userName}</th>
                                    <td className="px-6 py-4">{mentor.email}</td>
                                    <td className="px-6 py-4">{mentor.phone}</td>
                                    <td className={`px-6 py-4 ${mentor.isBlocked ? 'text-red-500' : ''}`}>
                                        {mentor.isBlocked ? 'Blocked' : 'Unblocked'}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => toggleBlockStatus(mentor._id, mentor.isBlocked, true)}
                                            className="font-medium text-indigo-600 dark:text-blue-500 hover:underline pr-4">

                                            {mentor.isBlocked ? 'Unblock' : 'Block'}
                                        </button>
                                        <button
                                            onClick={() => handleAdditionalAction(mentor._id)} // Replace with your actual function
                                            className="font-medium text-gray-600 dark:text-gray-300 hover:underline"
                                        >
                                             view
                                        </button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Users;
