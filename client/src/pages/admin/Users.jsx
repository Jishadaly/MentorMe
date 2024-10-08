import React, { useEffect, useState } from 'react';
import { fetchAllUsers, fetchAllMentors, updateBlockStatus } from '@/Api/services/adminServices';
import { fetchMentorData } from '@/Api/services/menteeService';

function Users() {
    const [users, setUsers] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [view, setView] = useState('users');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    useEffect(() => {
        const fetchData = async () => {
            const usersData = await fetchAllUsers('admin/getAllUsers');
            const mentorsData = await fetchAllMentors('admin/getAllMentors');
            setUsers(usersData.data.users);
            setMentors(mentorsData.data.Mentors);
        };
        fetchData();
    }, []);

    const toggleBlockStatus = async (id, isBlocked, isMentor) => {
        const response = await updateBlockStatus('admin/updateBlockStatus', id, !isBlocked);

        if (response) {
            if (isMentor) {
                setMentors(mentors.map(mentor =>
                    mentor._id === id ? { ...mentor, isBlocked: !isBlocked } : mentor));
            } else {
                setUsers(users.map(user =>
                    user._id === id ? { ...user, isBlocked: !isBlocked } : user));
            }
        }
    };

    const handleAdditionalAction = async (mentorId) => {
        const mentorData = await fetchMentorData(mentorId);
        console.log(mentorData);
    };

    const getPaginatedData = (data) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(view === 'users' ? users.length / itemsPerPage : mentors.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <div className="flex mb-4">
                <button
                    className={`px-4 py-2 ${view === 'users' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => { setView('users'); setCurrentPage(1); }}
                >
                    Users
                </button>
                <button
                    className={`px-4 py-2 ${view === 'mentors' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => { setView('mentors'); setCurrentPage(1); }}
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
                            {getPaginatedData(users).map(user => (
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
                                <th scope="col" className="px-6 py-3">Action</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Action</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {getPaginatedData(mentors).map(mentor => (
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
                                            onClick={() => handleAdditionalAction(mentor._id)}
                                            className="font-medium text-gray-600 dark:text-gray-300 hover:underline"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 mx-1 bg-gray-200 rounded"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages).keys()].map(number => (
                    <button
                        key={number}
                        className={`px-4 py-2 mx-1 ${currentPage === number + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => handlePageChange(number + 1)}
                    >
                        {number + 1}
                    </button>
                ))}
                <button
                    className="px-4 py-2 mx-1 bg-gray-200 rounded"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Users;