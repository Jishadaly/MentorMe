// // import React, { useEffect, useState } from 'react';
// // import { getMessages, sendMessge } from '@/Api/services/chatServices';
// // import { useSelector } from 'react-redux';
// // import { toast } from 'sonner';
// // import { ReplyIcon, SendIcon, SmileIcon } from '@/componets/icons/chatIcons';
// // import { io } from 'socket.io-client';

// // const socket = io('http://localhost:3000')

// // export default function Messages({ chatId }) {
// //     console.log(chatId);
// //     const [messages, setMessages] = useState([]);
// //     console.log("mmm",messages);
// //     const [message, setMessage] = useState('');
// //     const user = useSelector((state) => state.auth.user);
// //     const currentUserId = user.id;
// //     console.log("/////",currentUserId);

// //     if(!currentUserId){
// //         console.log("no user");
// //     };

// //     const fetchMessages = async () => {
// //         const fetchedMessages = await getMessages('chat/fetchMessages', chatId);
// //         console.log("123",fetchedMessages);
// //         setMessages(fetchedMessages);
// //     };

// //     const handleSend = async () => {
// //         if (message.trim() === '') return;

// //     try {
// //       const response = await sendMessge('chat/sendMessage', chatId, message);
// //       socket.emit('sendMessage', { chatId, ...response, sender: currentUserId });
// //       setMessage('');
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //     }
// //     };


// //     useEffect(() => {
// //         console.log("fetching")
// //         if (chatId) {
// //             fetchMessages();
// //             socket.emit('joinChat', chatId);
// //         }
// //     }, [chatId]);

// //     useEffect(() => {
// //         const handleReceiveMessage = (data) => {
// //           setMessages((prevMessages) => [...prevMessages, data]);
// //         };
    
// //         socket.on('receiveMessage', handleReceiveMessage);
    
// //         return () => {
// //           socket.off('receiveMessage', handleReceiveMessage);
// //         };
// //       }, []);


// //     return (
// //         <div className="flex-1 overflow-auto p-2 grid gap-2 mt-5">
// //             { messages.map((msg, index) => (
// //                 <div key={index} className={`flex items-start ${msg.sender === currentUserId ? 'justify-end' : ''}`}>
// //                     <div className="w-8 h-8 border rounded-full overflow-hidden">
// //                         <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
// //                         <ReplyIcon />
// //                     </div>
// //                     <div className={`${msg.sender === currentUserId ? 'bg-indigo-500 text-white' : 'bg-white'} p-3 rounded-lg max-w-[75%]`}>
// //                         <p className="text-sm font-inter">{ msg && msg.content}</p>
// //                         <div className="flex items-center gap-2 mt-1">
// //                             <p className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleTimeString()}</p>
// //                         </div>
// //                     </div>
// //                 </div>
// //             ))}

// //             <div className="flex items-center gap-2 bg-white p-3 rounded-lg">
// //                 <input type="text" placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1 bg-transparent" />
// //                 <SmileIcon className="w-4 h-4 text-gray-500" />
// //                 <button onClick={handleSend} className="text-gray-500 hover:text-gray-700 p-1">
// //                     <SendIcon className="w-5 h-5 text-indigo-500" />
// //                     <span className="sr-only">Send</span>
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }




// import React, { useEffect, useState } from 'react';
// import { getMessages, sendMessge } from '@/Api/services/chatServices';
// import { useSelector } from 'react-redux';
// import { toast } from 'sonner';

// import { io } from 'socket.io-client';
// import { SmileIcon,ReplyIcon, SendIcon  } from '@/componets/icons/chatIcons';

// const socket = io('http://localhost:3000', {
//   autoConnect: false,
// });

// export default function Messages({ chatId }) {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const user = useSelector((state) => state.auth.user);
//   const currentUserId = user.id;

//   const fetchMessages = async () => {
//     try {
//       const fetchedMessages = await getMessages('chat/fetchMessages', chatId);
//       setMessages(fetchedMessages);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   const handleSend = async () => {
//     if (message.trim() === '') return;
//     try {
//       const response = await sendMessge('chat/sendMessage', chatId, message);
//       socket.emit('sendMessage', { chatId, ...response, sender: currentUserId });
//       setMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   useEffect(() => {
//     if (chatId) {
//       fetchMessages();
//       socket.connect();
//       socket.emit('joinChat', chatId);

//       socket.on('receiveMessage', (data) => {
//         setMessages((prevMessages) => [...prevMessages, data]);
//       });

//       return () => {
//         socket.emit('leaveChat', chatId);
//         socket.off('receiveMessage');
//         socket.disconnect();
//       };
//     }
//   }, [chatId]);

//   return (
//     <div className="flex-1 overflow-auto p-2 grid gap-2 mt-5">
//       {messages.map((msg, index) => (
//         <div key={index} className={`flex items-start ${msg.sender === currentUserId ? 'justify-end' : ''}`}>
//           <div className="w-8 h-8 border rounded-full overflow-hidden">
//             <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
//             <ReplyIcon />
//           </div>
//           <div className={`${msg.sender === currentUserId ? 'bg-indigo-500 text-white' : 'bg-white'} p-3 rounded-lg max-w-[75%]`}>
//             <p className="text-sm font-inter">{msg && msg.content}</p>
//             <div className="flex items-center gap-2 mt-1">
//               <p className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleTimeString()}</p>
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="flex items-center gap-2 bg-white p-3 rounded-lg">
//         <input type="text" placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1 bg-transparent" />
//         <SmileIcon className="w-4 h-4 text-gray-500" />
//         <button onClick={handleSend} className="text-gray-500 hover:text-gray-700 p-1">
//           <SendIcon className="w-5 h-5 text-indigo-500" />
//           <span className="sr-only">Send</span>
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { getMessages, sendMessge } from '@/Api/services/chatServices';
import { useSelector } from 'react-redux';
import { SmileIcon, ReplyIcon, SendIcon } from '@/componets/icons/chatIcons';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  autoConnect: false,
});

export default function Messages({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const currentUserId = user.id;

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
      socket.emit('sendMessage', { chatId, ...response, sender: currentUserId });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (chatId) {
      fetchMessages();
      socket.connect();
      socket.emit('joinChat', chatId);

      socket.on('receiveMessage', (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.emit('leaveChat', chatId);
        socket.off('receiveMessage');
        socket.disconnect();
      };
    }
  }, [chatId]);

  return (
    <div className="flex-1 overflow-auto p-2 grid gap-2 mt-5">
      {messages.map((msg, index) => (
        <div key={index} className={`flex items-start ${msg.sender === currentUserId ? 'justify-end' : 'justify-start'}`}>
          <div className={`w-8 h-8 border rounded-full overflow-hidden ${msg.sender === currentUserId ? 'order-2 ml-2' : 'mr-2'}`}>
            <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
            <ReplyIcon />
          </div>
          <div className={`${msg.sender === currentUserId ? 'bg-indigo-500 text-white order-1' : 'bg-white'} p-3 rounded-lg max-w-[75%]`}>
            <p className="text-sm font-inter">{msg && msg.content}</p>
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
