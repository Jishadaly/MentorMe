import React, { useEffect, useState } from 'react';
import { getMessages, sendMessge } from '@/Api/services/chatServices'; 
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { ReplyIcon, SendIcon, SmileIcon } from '@/componets/icons/chatIcons';


export default function Messages({ chatId }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const user = useSelector((state)=> state.auth.user);
    const currentUserId = user.id;

    const fetchMessages = async (chatId) => {
        const fetchedMessages = await getMessages('chat/fetchMessages',chatId);
        console.log(fetchedMessages);
        setMessages(fetchedMessages);
    };

    const handleSend = async () => {
        try {
            const response = await sendMessge('chat/sendMessage',chatId , message);
            console.log(response);
            toast.success(response.message);
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        if (chatId) {
            fetchMessages(chatId);
        }
    }, [chatId]);

    return (
        <div className="flex-1 overflow-auto p-2 grid gap-2 mt-5">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-start ${msg.sender === currentUserId ? 'justify-end' : ''}`}>
                    <div className="w-8 h-8 border rounded-full overflow-hidden">
                        <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
                        <ReplyIcon/> 
                    </div>
                    <div className={`${msg.sender === currentUserId ? 'bg-indigo-500 text-white' : 'bg-white'} p-3 rounded-lg max-w-[75%]`}>
                        <p className="text-sm font-inter">{msg.content}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg">
                <input type="text" placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1 bg-transparent" />
                <SmileIcon className="w-4 h-4 text-gray-500" />
                <button onClick={handleSend} className="text-gray-500 hover:text-gray-700 p-1">
                     
                    <SendIcon className="w-5 h-5 text-indigo-500" />
                    <span className="sr-only">Send</span>
                </button>
            </div>
        </div>
    );
}

