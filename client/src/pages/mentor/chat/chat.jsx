import React, { useState, useEffect } from 'react';
import { getChats, sendMessge } from '@/Api/services/chatServices';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useChat } from '@/Context/chatContext';
import Messages from './Mesage';
import UserList from '@/pages/mentee/chat/UserList';
import { io } from 'socket.io-client';
import ChatFeature from '@/pages/mentee/chat/Nochats';
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
        <div className="flex min-h-screen bg-gray-100 md:p-12 md:mt-0 sm:mt-10  md:ml-20 md:mr-0">
            <div className="flex min-h-screen w-full">
                <UserList chats={chats} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId}/>
                 { 
                    selectedChatId ? (<Messages chatId={selectedChatId} />) : (  <ChatFeature/> ) 
                 }
                
            </div>
        </div>
    );
}