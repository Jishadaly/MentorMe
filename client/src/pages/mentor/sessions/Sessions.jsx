import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getSessions } from '@/Api/services/mentorServices';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';
import { BellIcon } from '@heroicons/react/24/outline';

function Button({ children, size = 'base', onClick }) {
    const sizeClasses = size === 'sm' ? 'px-2 py-1 text-sm' : 'px-4 py-2 text-base';
    return (
        <button onClick={onClick} className={`bg-indigo-500 text-white rounded ${sizeClasses}`}>
            {children}
        </button>
    );
}

function Card({ date, startTime, endTime, name, profilePic, role, sessionId, onJoin }) {

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
                <Button onClick={() => onJoin(sessionId)} size="sm" className="ml-auto">Join</Button>
                 <BellIcon className='w-6'/>

            </div>
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
            <div className="flex items-center justify-between mb-6 mt-10">
                <h1 className="text-3xl font-extrabold font-inter">MentorMe Sessions</h1>
                <Button onClick={()=> navigate('/mentor/availability')}>Schedule New Session</Button>
            </div>
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
                        sessionId={session._id}
                        onJoin={handleJoinButton}
                    />
                ))}
            </div>
        </div>
    );
}