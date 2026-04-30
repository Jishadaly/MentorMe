// import React, { useEffect, useState } from 'react';
// import moment from 'moment';
// import { getSessions } from '@/Api/services/mentorServices';
// import { useNavigate } from 'react-router-dom';
// import {  ChevronDownIcon } from '@heroicons/react/24/outline';
// import { updateSessionStatus } from '@/Api/services/mentorServices';
// import { TickIcon } from '@/componets/icons/chatIcons';

// function Button({ children, size = 'base', onClick }) {
//     const sizeClasses = size === 'sm' ? 'px-2 py-1 text-sm' : 'px-4 py-2 text-base';
//     return (
//         <button onClick={onClick} className={`bg-indigo-500 text-white rounded ${sizeClasses}`}>
//             {children}
//         </button>
//     );
// }

// function Dropdown({ options, onSelect }) {
//     return (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
//             {options.map((option, index) => (
//                 <button
//                     key={index}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     onClick={() => onSelect(option)} >
//                     {option}
//                 </button>
//             ))}
//         </div>
//     );
// }

// function Card({ date, startTime, endTime, name, profilePic, role, roomId, onJoin, sessionId, sessionStatus }) {

//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [status, setStatus] = useState('');

//     useEffect(() => {        
//         setStatus(sessionStatus)
//     }, [])
    
//     const handleDropdownToggle = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const handleStatusSelect = async (selectedStatus) => {

//         try {
//             const response = await updateSessionStatus('user/UpdateSessionStatus', selectedStatus, sessionId);
//             console.log(response);
//             setStatus(selectedStatus);
//             setIsDropdownOpen(false);
//         } catch (error) {
//             console.log(error);
//             setIsDropdownOpen(false);
//         }
//     };

//     return (
//         <div className="bg-white shadow rounded p-4">
//             <div className="flex items-center justify-between mb-2">
//                 <div className="text-sm font-medium text-gray-500">{moment(date).format('LL')}</div>
//                 <div className="text-sm font-medium text-gray-500">{moment(startTime).format('LT')} - {moment(endTime).format('LT')}</div>
//             </div>
//             <div className="flex items-center gap-2 mb-2">
//                 <Avatar profilePic={profilePic} />
//                 <div>
//                     <div className="font-medium">{name}</div>
//                     <div className="text-sm text-gray-500">{role}</div>
//                 </div>
//             </div>

//             <div className="flex justify-between">
//                 <Button onClick={() => onJoin(roomId)} size="sm" className="ml-auto">Join</Button>
//                 <div className="relative">
//                     <button onClick={handleDropdownToggle} className="flex items-center focus:outline-none">
//                         <ChevronDownIcon className="w-6 h-6" />
//                     </button>
//                     {isDropdownOpen && (
//                         <Dropdown options={['Completed', 'Pending']} onSelect={handleStatusSelect} />
//                     )}
//                 </div>
//             </div>
//             {status && (
//   <div className="text-sm font-medium text-gray-500 mt-2 flex items-center">
//     Status: 
//     <span className={`${status === 'Pending' ? 'text-yellow-900' : 'text-green-800'} ml-1`}>
//       {status}
//     </span>
//     {status === 'Completed' && (
//       <TickIcon className="w-6 h-6 p-0 m-0 ml-1" />
//     )}
//   </div>
// )}
//         </div>
//     );
// }

// function Avatar({ profilePic }) {
//     return (
//         <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
//             <img src={profilePic} alt="Profile" className="h-full w-full rounded-full object-cover" />
//         </div>
//     )
// }

// export default function Sessions() {
//     const [sessions, setSessions] = useState([]);
//     const navigate = useNavigate();

//     const fetchSessions = async () => {
//         const sessions = await getSessions('user/mentorSessions');
//         console.log(sessions);
//         setSessions(sessions);
//     };

//     useEffect(() => {
//         fetchSessions();
//     }, []);

//     const handleJoinButton = (sessionId) => {
//         navigate(`/meet/${sessionId}`)
//     };

//     return (
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

//             {sessions.length > 0 ? (
//                 <div className="flex items-center justify-between mb-6 mt-10">
//                     <h1 className="text-4xl font-extrabold font-inter"> Sessions</h1>
//                     <Button onClick={() => navigate('/mentor/availability')}>Schedule New Session</Button>
//                 </div>
//             ) : (
//                 <p className='mt-10'> there is no booked sessions</p>
//             )}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {sessions.map((session, index) => (
//                     <Card
//                         key={index}
//                         date={session.date}
//                         startTime={session.startTime}
//                         endTime={session.endTime}
//                         name={session.bookedBy.userName}
//                         profilePic={session.bookedBy.profilePic}
//                         role="Web Development"
//                         roomId={session.roomId}
//                         onJoin={handleJoinButton}
//                         sessionId={session._id}
//                         sessionStatus={session.status}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }



import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getSessions, updateSessionStatus } from '@/Api/services/mentorServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  FiVideo, FiClock, FiCalendar, FiFilter, FiSearch, FiCheckCircle, 
  FiAlertCircle, FiX, FiChevronLeft, FiChevronRight, FiMessageCircle,
  FiMoreVertical, FiEdit, FiDownload, FiRefreshCw
} from 'react-icons/fi';

export default function MentorSessions() {
  const navigate = useNavigate();
  
  // State Management
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, upcoming, completed, pending
  const [dateFilter, setDateFilter] = useState('all'); // all, today, week, month
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  
  // Stats
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
    pending: 0,
    todaysSessions: 0
  });

  // Fetch sessions
  const fetchSessions = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      else setLoading(true);
      
      const data = await getSessions('user/mentorSessions');
      console.log(data)
      setSessions(data);
      calculateStats(data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Calculate statistics
  const calculateStats = (sessionsData) => {
    const now = moment();
    const today = moment().startOf('day');
    
    const stats = {
      total: sessionsData.length,
      upcoming: sessionsData.filter(s => 
        moment(s.startTime).isAfter(now) && s.status !== 'Completed'
      ).length,
      completed: sessionsData.filter(s => s.status === 'Completed').length,
      pending: sessionsData.filter(s => s.status === 'Pending').length,
      todaysSessions: sessionsData.filter(s => 
        moment(s.date).isSame(today, 'day')
      ).length
    };
    
    setStats(stats);
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...sessions];
    const now = moment();

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(session =>
        session.bookedBy.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter === 'upcoming') {
      filtered = filtered.filter(s => 
        moment(s.startTime).isAfter(now) && s.status !== 'Completed'
      );
    } else if (statusFilter === 'completed') {
      filtered = filtered.filter(s => s.status === 'Completed');
    } else if (statusFilter === 'pending') {
      filtered = filtered.filter(s => s.status === 'Pending');
    }

    // Date filter
    const today = moment().startOf('day');
    if (dateFilter === 'today') {
      filtered = filtered.filter(s => moment(s.date).isSame(today, 'day'));
    } else if (dateFilter === 'week') {
      filtered = filtered.filter(s => 
        moment(s.date).isBetween(today, moment().add(7, 'days'))
      );
    } else if (dateFilter === 'month') {
      filtered = filtered.filter(s => 
        moment(s.date).isSame(today, 'month')
      );
    }

    // Sort by date (upcoming first)
    filtered.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    setFilteredSessions(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [sessions, searchTerm, statusFilter, dateFilter]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSessions = filteredSessions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update session status
  const handleStatusUpdate = async (sessionId, newStatus) => {
    try {
      await updateSessionStatus('user/UpdateSessionStatus', newStatus, sessionId);
      
      setSessions(prev => prev.map(session =>
        session._id === sessionId ? { ...session, status: newStatus } : session
      ));
      
      toast.success(`Session marked as ${newStatus.toLowerCase()}`);
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update session status');
    }
  };

  // Join session
  const handleJoinSession = (roomId, startTime) => {
    const now = moment();
    const sessionStart = moment(startTime);
    const timeDiff = sessionStart.diff(now, 'minutes');

    if (timeDiff > 15) {
      toast.error(`Session starts in ${timeDiff} minutes. You can join 15 minutes before.`);
      return;
    }

    navigate(`/meet/${roomId}`);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDateFilter('all');
  };

  // Export sessions (CSV)
  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Mentee', 'Status', 'Duration'];
    const rows = filteredSessions.map(session => [
      moment(session.date).format('YYYY-MM-DD'),
      `${moment(session.startTime).format('HH:mm')} - ${moment(session.endTime).format('HH:mm')}`,
      session.bookedBy.userName,
      session.status,
      `${session.duration || 60} mins`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sessions-${moment().format('YYYY-MM-DD')}.csv`;
    a.click();
    
    toast.success('Sessions exported successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Sessions</h1>
              <p className="text-gray-600 mt-1">Manage and track your mentoring sessions</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => fetchSessions(true)}
                disabled={refreshing}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <FiRefreshCw className={refreshing ? 'animate-spin' : ''} size={18} />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FiDownload size={18} />
                Export
              </button>
              <button
                onClick={() => navigate('/mentor/availability')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <FiCalendar size={18} />
                Manage Availability
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <StatCard
              icon={<FiCalendar className="text-blue-600" size={24} />}
              label="Total Sessions"
              value={stats.total}
              bgColor="bg-blue-50"
            />
            <StatCard
              icon={<FiClock className="text-orange-600" size={24} />}
              label="Upcoming"
              value={stats.upcoming}
              bgColor="bg-orange-50"
            />
            <StatCard
              icon={<FiCheckCircle className="text-green-600" size={24} />}
              label="Completed"
              value={stats.completed}
              bgColor="bg-green-50"
            />
            <StatCard
              icon={<FiAlertCircle className="text-yellow-600" size={24} />}
              label="Pending"
              value={stats.pending}
              bgColor="bg-yellow-50"
            />
            <StatCard
              icon={<FiVideo className="text-purple-600" size={24} />}
              label="Today"
              value={stats.todaysSessions}
              bgColor="bg-purple-50"
            />
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by mentee name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>

              {/* Date Filter */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              {/* Clear Filters */}
              {(searchTerm || statusFilter !== 'all' || dateFilter !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <FiX size={18} />
                  Clear
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {(searchTerm || statusFilter !== 'all' || dateFilter !== 'all') && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1">
                    Search: {searchTerm}
                    <button onClick={() => setSearchTerm('')}><FiX size={14} /></button>
                  </span>
                )}
                {statusFilter !== 'all' && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1">
                    Status: {statusFilter}
                    <button onClick={() => setStatusFilter('all')}><FiX size={14} /></button>
                  </span>
                )}
                {dateFilter !== 'all' && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1">
                    Date: {dateFilter}
                    <button onClick={() => setDateFilter('all')}><FiX size={14} /></button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredSessions.length)} of {filteredSessions.length} sessions
        </div>

        {/* Sessions Grid */}
        {currentSessions.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentSessions.map((session) => (
                <SessionCard
                  key={session._id}
                  session={session}
                  onJoin={handleJoinSession}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft size={20} />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show first, last, and pages around current
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === pageNumber
                            ? 'bg-indigo-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber}>...</span>;
                  }
                  return null;
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            onClearFilters={clearFilters}
            onAddAvailability={() => navigate('/mentor/availability')}
          />
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, label, value, bgColor }) {
  return (
    <div className={`${bgColor} rounded-xl p-4 border border-gray-200`}>
      <div className="flex items-center justify-between mb-2">
        <div>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

// Session Card Component
function SessionCard({ session, onJoin, onStatusUpdate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const now = moment();
  const sessionStart = moment(session.startTime);
  const sessionEnd = moment(session.endTime);
  const isPast = sessionEnd.isBefore(now);
  const isToday = moment(session.date).isSame(now, 'day');
  const canJoin = sessionStart.diff(now, 'minutes') <= 15 && !isPast;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden group">
      {/* Date Header */}
      <div className={`px-4 py-3 ${isToday ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-50'} border-b`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${isToday ? 'text-white' : 'text-gray-700'}`}>
            <FiCalendar size={16} />
            <span className="font-semibold text-sm">
              {moment(session.date).format('MMM DD, YYYY')}
            </span>
          </div>
          {isToday && (
            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
              Today
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Mentee Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={session.bookedBy.profilePic}
            alt={session.bookedBy.userName}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {session.bookedBy.userName}
            </h3>
            <p className="text-sm text-gray-500">Mentee</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiMoreVertical size={18} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    navigate(`/mentor/chat`);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <FiMessageCircle size={16} />
                  Send Message
                </button>
                {session.status !== 'Completed' && (
                  <button
                    onClick={() => {
                      onStatusUpdate(session._id, 'Completed');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <FiCheckCircle size={16} />
                    Mark Completed
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FiClock size={16} />
          <span className="text-sm font-medium">
            {moment(session.startTime).format('h:mm A')} - {moment(session.endTime).format('h:mm A')}
          </span>
        </div>

        {/* Status */}
        <div className="mb-4">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
            {session.status === 'Completed' && <FiCheckCircle size={14} />}
            {session.status === 'Pending' && <FiAlertCircle size={14} />}
            {session.status}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {canJoin && session.status !== 'Completed' ? (
            <button
              onClick={() => onJoin(session.roomId, session.startTime)}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <FiVideo size={16} />
              Join Session
            </button>
          ) : isPast && session.status === 'Pending' ? (
            <button
              onClick={() => onStatusUpdate(session._id, 'Completed')}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
            >
              <FiCheckCircle size={16} />
              Mark Completed
            </button>
          ) : (
            <div className="flex-1 text-center py-2 text-sm text-gray-500">
              {session.status === 'Completed' ? 'Session completed' : 
               `Starts ${sessionStart.fromNow()}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState({ searchTerm, statusFilter, dateFilter, onClearFilters, onAddAvailability }) {
  const hasFilters = searchTerm || statusFilter !== 'all' || dateFilter !== 'all';

  return (
    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
      <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <FiCalendar className="text-gray-400" size={40} />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {hasFilters ? 'No sessions found' : 'No sessions yet'}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {hasFilters
          ? 'Try adjusting your filters or search criteria'
          : 'Add your availability to start accepting session bookings'}
      </p>
      <div className="flex gap-3 justify-center">
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        )}
        <button
          onClick={onAddAvailability}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Manage Availability
        </button>
      </div>
    </div>
  );
}