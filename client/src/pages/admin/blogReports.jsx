import React, { useEffect, useState } from 'react';
import { fetchAllReports, updateBlogStatus } from '@/Api/services/adminServices';
import moment from 'moment';

function Reports() {
    const [reports, setReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    useEffect(() => {
        const fetchData = async () => {
            const reportsData = await fetchAllReports('user/getAllReports');
            console.log(reportsData);
            setReports(reportsData);
        };
        fetchData();
    }, []);

    const handleBlockUnblock = async (reportId, isBlocked) => {
        const blogId = reports.find(report => report._id === reportId).blogId._id;
        const response = await updateBlogStatus('admin/updateBlogStatus', blogId, !isBlocked);

        if (response) {
            setReports(reports.map(report =>
                report._id === reportId
                    ? { ...report, blogId: { ...report.blogId, isBlocked: !isBlocked } }
                    : report
            ));
        }
    };

    const handleViewReport = (reportId) => {
        console.log(`Viewing report with ID: ${reportId}`);
    };

    const getPaginatedData = (data) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(reports.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className='p-6'>
            <h1 className="text-3xl font-extrabold font-inter mb-6">Reports</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-inter w-1/5">Blog</th>
                            <th scope="col" className="px-6 py-3 font-inter w-1/5">Reported By</th>
                            <th scope="col" className="px-6 py-3 font-inter w-1/5 text-center">Date</th>
                            <th scope="col" className="px-6 py-3 font-inter w-1/5">Cause</th>
                            <th scope="col" className="px-6 py-3 font-inter w-1/10 text-center">Status</th>
                            <th scope="col" className="px-6 py-3 font-inter w-1/10 text-right"><span className="sr-only">Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {getPaginatedData(reports).map(report => (
                            <tr key={report._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-inter whitespace-nowrap w-1/5">{report.blogId.title}</td>
                                <td className="px-6 py-4 font-inter whitespace-nowrap w-1/5">{report.userId.userName}</td>
                                <td className="px-6 py-4 font-inter text-center w-1/5">{moment(report.createdAt).format('MMMM Do YYYY')}</td>
                                <td className="px-6 py-4 font-inter w-1/5 whitespace-nowrap">{report.reason}</td>
                                <td className={`px-6 py-4 font-inter text-center w-1/10 whitespace-nowrap ${report.blogId.isBlocked ? 'text-red-600' : ''}`}>
                                    {report.blogId.isBlocked ? 'Blocked' : 'Unblocked'}
                                </td>
                                <td className="px-6 py-4 text-right w-1/10">
                                    <button
                                        onClick={() => handleBlockUnblock(report._id, report.blogId.isBlocked)}
                                        className={`font-medium ${report.blogId.isBlocked === false ? 'text-red-600' : 'text-indigo-600'} dark:text-blue-500 hover:underline`}
                                    >
                                        {report.blogId.isBlocked ? 'Unblock' : 'Block'}
                                    </button>
                                    <button
                                        onClick={() => handleViewReport(report._id)}
                                        className="font-medium text-gray-600 dark:text-gray-300 hover:underline ml-2"
                                    >
                                        {/* View */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 mx-1 bg-gray-200 rounded font-inter"
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
                    className="px-4 py-2 mx-1 bg-gray-200 rounded font-inter"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Reports;
