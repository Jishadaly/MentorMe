import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getSessions } from '@/Api/services/mentorServices';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { updateSessionStatus } from '@/Api/services/mentorServices';
import { TickIcon } from '@/componets/icons/chatIcons';

function Button({ children, size = 'base', onClick }) {
    const sizeClasses = size === 'sm' ? 'px-2 py-1 text-sm' : 'px-4 py-2 text-base';
    return (
        <button onClick={onClick} className={`bg-indigo-500 text-white rounded ${sizeClasses}`}>
            {children}
        </button>
    );
}

function Dropdown({ options, onSelect }) {
    return (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            {options.map((option, index) => (
                <button
                    key={index}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => onSelect(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

function Card({ date, startTime, endTime, name, profilePic, role, roomId, onJoin, sessionId, sessionStatus }) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        
        setStatus(sessionStatus)
        console.log("123123",sessionStatus);
    }, [])


    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleStatusSelect = async (selectedStatus) => {

        try {
            const response = await updateSessionStatus('user/UpdateSessionStatus', selectedStatus, sessionId);
            console.log(response);
            setStatus(selectedStatus);
            setIsDropdownOpen(false);
        } catch (error) {
            console.log(error);
            setIsDropdownOpen(false);
        }
    };

    return (
        <div className="bg-white shadow rounded p-4">
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">{moment(date).format('LL')}</div>
                <div className="text-sm font-medium text-gray-500">{moment(startTime).format('LT')} - {moment(endTime).format('LT')}</div>
            </div>
            <div className="flex items-center gap-2 mb-2">
                <Avatar profilePic={profilePic} />
                <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-gray-500">{role}</div>
                </div>
            </div>

            <div className="flex justify-between">
                <Button onClick={() => onJoin(roomId)} size="sm" className="ml-auto">Join</Button>
                <div className="relative">
                    <button onClick={handleDropdownToggle} className="flex items-center focus:outline-none">
                        <ChevronDownIcon className="w-6 h-6" />
                    </button>
                    {isDropdownOpen && (
                        <Dropdown options={['Completed', 'Pending']} onSelect={handleStatusSelect} />
                    )}
                </div>
            </div>
            {status && (
  <div className="text-sm font-medium text-gray-500 mt-2 flex items-center">
    Status: 
    <span className={`${status === 'Pending' ? 'text-yellow-900' : 'text-green-800'} ml-1`}>
      {status}
    </span>
    {status === 'Completed' && (
      <TickIcon className="w-6 h-6 p-0 m-0 ml-1" />
    )}
  </div>
)}


        </div>
    );
}

function Avatar({ profilePic }) {
    return (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
            <img src={profilePic} alt="Profile" className="h-full w-full rounded-full object-cover" />
        </div>
    )
}

export default function Sessions() {
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();

    const fetchSessions = async () => {
        const sessions = await getSessions('user/mentorSessions');
        console.log(sessions);
        setSessions(sessions);
    };



    useEffect(() => {
        fetchSessions();
    }, []);

    const handleJoinButton = (sessionId) => {
        navigate(`/meet/${sessionId}`)
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {sessions.length > 0 ? (
                <div className="flex items-center justify-between mb-6 mt-10">
                    <h1 className="text-4xl font-extrabold font-inter"> Sessions</h1>
                    <Button onClick={() => navigate('/mentor/availability')}>Schedule New Session</Button>
                </div>
            ) : (
                <p className='mt-10'> there is no booked sessions</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sessions.map((session, index) => (
                    <Card
                        key={index}
                        date={session.date}
                        startTime={session.startTime}
                        endTime={session.endTime}
                        name={session.bookedBy.userName}
                        profilePic={session.bookedBy.profilePic}
                        role="Web Development"
                        roomId={session.roomId}
                        onJoin={handleJoinButton}
                        sessionId={session._id}
                        sessionStatus={session.status}
                    />
                ))}
            </div>
        </div>
    );
}