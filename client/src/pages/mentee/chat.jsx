import React, { useState, useEffect } from 'react';
import { getChats, sendMessge } from '@/Api/services/chatServices';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useChat } from '@/Context/chatContext';
import Messages from '../mentor/chat/Mesage';
import UserList from './chat/UserList';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000')

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
        socket.emit('joinChat', chatId);
    }

    useEffect(() => {
        console.log("fetching data");
        fetchAllChats();
    }, [])




    return (
        <div className="flex min-h-screen bg-gray-100 p-12 ml-3">
            <div className="flex min-h-screen w-full">
                <UserList chats={chats} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId}/>
                <Messages chatId={selectedChatId} />
            </div>
        </div>
    );
}

