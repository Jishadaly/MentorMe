// import React, { useState, useEffect } from 'react';
// import { getChats, sendMessge } from '@/Api/services/chatServices';
// import { toast } from 'sonner';
// import { useSelector } from 'react-redux';
// import { useChat } from '@/Context/chatContext';
// import Messages from '../mentor/chat/Mesage';
// import UserList from './chat/UserList';
// import ChatFeature from '@/pages/mentee/chat/Nochats';

// export default function Chat() {

//     const user = useSelector((state) => state.auth.user)
//     const [selectedChatId, setSelectedChatId] = useState(null);
//     const [chats, setChats] = useState([]);

//     const fetchAllChats = async () => {
//         try {
//           const fetchedChats = await getChats('chat/getAllChats');
//           console.log(fetchedChats);
//           setChats(fetchedChats);
//         } catch (error) {
//           console.error('Error fetching chats:', error);
//         }
//       };


//     const handleSelectedChat = (chatId)=>{
//         console.log("selectedChatId",chatId);
//         setSelectedChatId(chatId);
//         markMessageAsRead(chatId)
//         socket.emit('joinChat', chatId);
//     }

//     const markMessageAsRead = (chatId)=>{
//         setChats(prevChats => 
//             prevChats.map(chat => 
//                 chat._id === chatId ? { ...chat, unreadCount: 0, latestMessage: { ...chat.latestMessage, isRead: true } } : chat
//             )
//         );
//     }
    
//     useEffect(() => {
//         console.log("fetching data");
//         fetchAllChats();
//     }, [])

//     return (
//         <div className=" min-h-screen bg-gray-100  ml-16 mt-14 mr-0  rounded-lg ">
//             <div className="flex min-h-screen w-full">
//                 <UserList chats={chats} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId}/>
//                 { selectedChatId ? (<Messages chatId={selectedChatId} />) : (  <ChatFeature/> ) }
//             </div>
//         </div>
//     );
// }



// ============================================
// 1. Main Chat Component (Unified for Mentor & Mentee)
// ============================================
import React, { useState, useEffect, useRef } from 'react';
import { getChats } from '@/Api/services/chatServices';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ChatSidebar from '../../componets/chat/ChatSlidebar';
import ChatWindow from '../../componets/chat/ChatWindow';
import ChatEmpty from '../../componets/chat/ChatEmpty';
import { FiMenu, FiX } from 'react-icons/fi';

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

export default function Chat() {
  const user = useSelector((state) => state.auth.user);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  useEffect(() => {
    fetchAllChats();
    connectSocket();
    setIsSidebarOpen(true)

    return () => {
      socket.disconnect();
    };
  }, []);

  const connectSocket = () => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('userOnline', user.id);
    });

    socket.on('userStatusChange', ({ userId, isOnline }) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        if (isOnline) {
          newSet.add(userId);
        } else {
          newSet.delete(userId);
        }
        return newSet;
      });
    });

    socket.on('newMessage', (message) => {
      // Update chat list with new message
      setChats(prevChats => {
        const chatIndex = prevChats.findIndex(c => c._id === message.chat);
        if (chatIndex !== -1) {
          const updatedChats = [...prevChats];
          const chat = { ...updatedChats[chatIndex] };
          chat.latestMessage = message;
          
          // Increment unread if message is not from current user and chat is not selected
          if (message.sender._id !== user.id && selectedChatId !== chat._id) {
            chat.unreadCount = (chat.unreadCount || 0) + 1;
          }
          
          updatedChats.splice(chatIndex, 1);
          updatedChats.unshift(chat);
          return updatedChats;
        }
        return prevChats;
      });
    });
  };

  const fetchAllChats = async () => {
    try {
      setLoading(true);
      const fetchedChats = await getChats('chat/getAllChats');
      setChats(fetchedChats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selecting chat
    
    // Mark messages as read
    setChats(prevChats =>
      prevChats.map(chat =>
        chat._id === chatId 
          ? { ...chat, unreadCount: 0 }
          : chat
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-40
        w-80 lg:w-96
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <ChatSidebar
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
          loading={loading}
          currentUserId={user.id}
          onlineUsers={onlineUsers}
          onRefresh={fetchAllChats}
        />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChatId ? (
          <ChatWindow
            chatId={selectedChatId}
            currentUserId={user.id}
            socket={socket}
            onBack={() => setSelectedChatId(null)}
          />
        ) : (
          <ChatEmpty />
        )}
      </div>
    </div>
  );
}