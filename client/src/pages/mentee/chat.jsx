import React, { useState, useEffect } from 'react';
import { getChats, sendMessge } from '@/Api/services/chatServices';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useChat } from '@/Context/chatContext';
import Messages from '../mentor/chat/Mesage';
import UserList from './chat/UserList';
import ChatFeature from '@/pages/mentee/chat/Nochats';

export default function Chat() {

    const user = useSelector((state) => state.auth.user)
    // const [message , setMessage] = useState('');
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [chats, setChats] = useState([]);

    const fetchAllChats = async () => {
        try {
          const fetchedChats = await getChats('chat/getAllChats');
          console.log(fetchedChats);
          setChats(fetchedChats);
        } catch (error) {
          console.error('Error fetching chats:', error);
        }
      };


    const handleSelectedChat = (chatId)=>{
        console.log("selectedChatId",chatId);
        setSelectedChatId(chatId);
        markMessageAsRead(chatId)
        socket.emit('joinChat', chatId);
    }

    const markMessageAsRead = (chatId)=>{
        setChats(prevChats => 
            prevChats.map(chat => 
                chat._id === chatId ? { ...chat, unreadCount: 0, latestMessage: { ...chat.latestMessage, isRead: true } } : chat
            )
        );
    }

    useEffect(() => {
        console.log("fetching data");
        fetchAllChats();
    }, [])

    return (
        <div className=" min-h-screen bg-gray-100  ml-16 mt-14 mr-0  rounded-lg ">
            <div className="flex min-h-screen w-full">
                <UserList chats={chats} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId}/>
                { selectedChatId ? (<Messages chatId={selectedChatId} />) : (  <ChatFeature/> ) }
            </div>
        </div>
    );
}