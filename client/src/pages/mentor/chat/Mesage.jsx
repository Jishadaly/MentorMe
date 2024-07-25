import React, { useEffect, useState } from 'react';
import { getMessages, sendMessge } from '@/Api/services/chatServices';
import { useSelector } from 'react-redux';
import { SmileIcon, ReplyIcon, SendIcon } from '@/componets/icons/chatIcons';
import { io } from 'socket.io-client';
import ReactLoading from 'react-loading';


const socket = io('http://localhost:3000', {
  autoConnect: false,
});

export default function Messages({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const [ opositeUser , setOpositeuser ] = useState('')

  const user = useSelector((state) => state.auth.user);
  const currentUserId = user.id;
  console.log("///", messages);

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getMessages('chat/fetchMessages', chatId);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  

  const handleSend = async () => {
    if (message.trim() === '') return;
    try {
      const response = await sendMessge('chat/sendMessage', chatId, message);
      console.log("///response", response);
      socket.emit('sendMessage', { chatId, ...response });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value)
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { chatId, sender: currentUserId });
    }

    if (e.target.value === '') {
      setIsTyping(false);
      socket.emit('stopTyping', { chatId, sender: currentUserId });
    }
  }

  useEffect(()=>{
    if (chatId) {
      
    }
  })

  useEffect(() => {
    if (chatId) {
      fetchMessages();
      socket.connect();
      socket.emit('joinChat', chatId);

      socket.on('receiveMessage', (data) => {
        console.log("recived mssg", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      socket.on('typing', (data) => {
        if (data.sender !== currentUserId) {
          setTypingMessage('Typing...');
        }
      });

      socket.on('stopTyping', (data) => {
        if (data.sender !== currentUserId) {
          setTypingMessage('');
        }
      });

      return () => {
        socket.emit('leaveChat', chatId);
        socket.off('receiveMessage');
        socket.off('typing');
        socket.off('stopTyping');
        socket.disconnect();
      };
    }
  }, [chatId]);

  return (
    <div className="flex-1 overflow-auto p-2 grid gap-2 mt-5">


      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start ${msg.sender._id === currentUserId ? 'justify-end' : 'justify-start'}`}
        >
          {msg.sender._id !== currentUserId && (
            <div className="w-8 h-8 border rounded-full overflow-hidden mr-2">
              <img src={msg.sender.profilePic} alt="User" className="w-full h-full object-cover" />
            </div>
          )}
          <div
            className={`${msg.sender._id === currentUserId ? 'bg-indigo-500 text-white' : 'bg-white'
              } p-3 rounded-lg max-w-[75%]`}
          >
            <p className="text-sm font-inter">{msg.content}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
          {msg.sender._id === currentUserId && (
            <div className="w-8 h-8 border rounded-full overflow-hidden ml-2">
              <img src={msg.sender.profilePic} alt="User" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      ))}

      {typingMessage && (

        
        <div className="text-sm text-gray-500">
          <div className="w-8 h-8 border rounded-full overflow-hidden mr-2">
              
            </div>
          {/* {typingMessage} */}
          <ReactLoading type="bubbles" color="#808080" height={50} width={50} />

          

        </div>
      )}
      <div className="flex items-center gap-2 bg-white p-3 rounded-lg">
        <input type="text" placeholder="Type your message..."
          value={message} onChange={(e) => handleChange(e)}
          onBlur={() => {
            setIsTyping(false);
            socket.emit('stopTyping', { chatId, sender: currentUserId });
          }}
          className="flex-1 bg-transparent" />
        <SmileIcon className="w-4 h-4 text-gray-500" />
        <button onClick={handleSend} className="text-gray-500 hover:text-gray-700 p-1">
          <SendIcon className="w-5 h-5 text-indigo-500" />
          <span className="sr-only">Send</span>
        </button>
      </div>
    </div>
  );
}