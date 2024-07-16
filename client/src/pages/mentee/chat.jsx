import React, { useState, useEffect } from 'react';
import { getChats, sendMessge } from '@/Api/services/chatServices';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useChat } from '@/Context/chatContext';
import Messages from '../mentor/chat/Mesage';
import UserList from './chat/UserList';



export default function Chat() {
    const { chatId, setChats, chats } = useChat();
    const [message, setMessage] = useState('');
    console.log(chatId);
    
    const [selectedChatId, setSelectedChatId] = useState(null);


    const handleSend = async () => {
        try {
            const response = await sendMessge('chat/sendMessage', chatId, message);
            console.log(response);
            toast.success(response.message);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAllChats = async () => {
        const fetchedChats = await getChats('chat/getAllChats');
        console.log(fetchedChats);
        setChats(fetchedChats)
    }


    useEffect(() => {
        const initializeChat = async () => {
            if (chatId) {
                if (chatId !== chat?._id) {
                    const chatMessages = await fetchChatMessages(chatId);
                    setChat({ _id: chatId });
                    setMessages(chatMessages);
                }
            } else {
                console.log("no id");
                await fetchAllChats();
            }
        };

        initializeChat();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100 p-12 ml-3">
            <div className="flex min-h-screen w-full">                
                <UserList chats={chats} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId}/>
                <Messages chatId={selectedChatId} />

            </div>
        </div>
    );
}

