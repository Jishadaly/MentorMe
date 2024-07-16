import React, { useEffect, useState } from 'react'
import { getChats } from '@/Api/services/chatServices';
import Messages from './Mesage';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');


export default function MentorChat() {
    const user = useSelector((state) => state.auth.user)
    // const [message , setMessage] = useState('');
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [chats, setChats] = useState([]);

    const fetchAllChats = async () => {
        const fetchedChats = await getChats('chat/getAllChats');
        setChats(fetchedChats)
    }

    useEffect(() => {
        fetchAllChats();

        socket.on('receiveMessage', (data) => {
            console.log("recive messg",data);
            if (data.chatId === selectedChatId) {
                setChats(prevChats => {
                    return prevChats.map(chat => {
                        if (chat._id === data.chatId) {
                            chat.latestMessage = data;
                        }
                        return chat;
                    });
                });
            }
        });

        return () => {
            socket.off('receiveMessage'); // Clean up the listener


        };
    }, [selectedChatId])

    return (

        <div className="flex min-h-screen bg-gray-100 p-12 ">
            <div className="flex min-h-screen w-full ">

                <div className="bg-white p-6 border-r w-1/3 ml-24">

                    <h1 className='text-2xl font-inter font-extrabold mb-2' >messages</h1>


                    <div className="bg-gray-200 rounded-md px-4 py-2 text-sm">
                        <input type="text" placeholder="Search for a mentor..." className="w-full bg-transparent" />
                    </div>
                    <div className="mt-4 space-y-4">
                        {chats.map((chat, index) => {
                            const otherUser = chat.users.find((u) => u._id !== user.id);
                            const isSelected = chat._id === selectedChatId;
                            return (
                                <div key={index} className={`flex items-center gap-4 cursor-pointer p-2 rounded-md ${isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'}`} onClick={() => setSelectedChatId(chat._id)}>
                                    <div className="w-8 h-8 border rounded-full overflow-hidden">
                                        <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{otherUser?.userName}</p>
                                        <p className="text-xs text-gray-500">
                                            {chat.latestMessage.content}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Messages chatId={selectedChatId} />
            </div>
        </div>
    );
}

