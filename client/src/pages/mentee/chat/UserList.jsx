import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function UserList({ chats, setSelectedChatId, selectedChatId }) {
    const user = useSelector((state) => state.auth.user);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectedChat = (chatId) => {
        console.log(chatId);
        setSelectedChatId(chatId);
        socket.emit('joinChat', chatId);
    };

    const filteredChats = chats.filter(chat => {
        const otherUser = chat.users.find((u) => u._id !== user.id);
        return otherUser?.userName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="bg-white p-6 border-r w-1/3">
            <h1 className='text-2xl font-inter font-extrabold mb-2'>Messages</h1>
            <div className="bg-gray-200 rounded-md px-4 py-2 text-sm">
                <input
                    type="text"
                    placeholder="Search for a mentor..."
                    className="w-full bg-transparent focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="mt-4 space-y-4">
                {filteredChats.map((chat, index) => {
                    const otherUser = chat.users.find((u) => u._id !== user.id);
                    const isSelected = chat._id === selectedChatId;
                    const hasUnreadMessages = chat.unreadCount > 0;
                    const isLatestMessageUnread = chat.latestMessage?.isRead === false && chat.latestMessage.sender._id !== user.id;

                    return (
                        <div
                            key={index}
                            className={`flex items-center gap-4 cursor-pointer p-2 rounded-md ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                            onClick={() => handleSelectedChat(chat._id)}
                        >
                            <div className="relative w-8 h-8 border rounded-full overflow-hidden">
                                <img src={otherUser?.profilePic} alt="User" className="w-full h-full object-cover" />
                                {hasUnreadMessages && !isSelected && (
                                    <span className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-semibold rounded-full px-1">
                                        {chat.unreadCount}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{otherUser?.userName}</p>
                                <p className={`text-xs ${isLatestMessageUnread && !isSelected ? 'font-bold text-black' : 'text-gray-500'}`}>
                                    {chat.latestMessage?.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

