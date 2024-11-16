import React, { useEffect, useRef, useState } from 'react';
import { getMessages, sendMessge } from '@/Api/services/chatServices';
import { useSelector } from 'react-redux';
import { SmileIcon, ReplyIcon, SendIcon, AttachmentIcon } from '@/componets/icons/chatIcons';
import { io } from 'socket.io-client';
import ReactLoading from 'react-loading';
import DownloadButton from '@/componets/downloadButton/DownloadButton';
import EmojiPicker from 'emoji-picker-react';

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL);

export default function Messages({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const [opositeUser, setOpositeuser] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const currentUserId = user.id;
  const messagesContainerRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getMessages('chat/fetchMessages', chatId);
      console.log('fetched messages from database', fetchedMessages);
      setMessages(fetchedMessages);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSend = async () => {
    if (message.trim() === '' && !attachment) return;
    setIsSending(true)
    try {
      const formData = new FormData();
      formData.append('chatId', chatId);
      formData.append('message', message);
      if (attachment) {
        formData.append('image', attachment);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await sendMessge('chat/sendMessage', formData, config);
      console.log('response', response);
      socket.emit('sendMessage', { chatId, ...response });

      setMessage('');
      setAttachment(null);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { chatId, sender: currentUserId });
    }

    if (e.target.value === '') {
      setIsTyping(false);
      socket.emit('stopTyping', { chatId, sender: currentUserId });
    }
  };

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setMessage((prevMessage) => prevMessage + event.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (chatId) {
      fetchMessages();
      socket.connect();
      socket.emit('joinChat', chatId);

      socket.on('receiveMessage', (data) => {
        console.log('received message', data);
        setMessages((prevMessages) => [...prevMessages, data]);
        // scrollToBottom();
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
    <div ref={messagesContainerRef} className="flex-1 grid gap-2 bg-indigo-50   w-full p-10">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start ${msg.sender._id === currentUserId ? 'justify-end' : 'justify-start'}`}>
          {msg.sender._id !== currentUserId && (
            <div className="w-8 h-8 border rounded-full overflow-hidden mr-2">
              <img src={msg.sender.profilePic} alt="User" className="w-full h-full object-cover" />
            </div>
          )}
          <div
            className={`${msg.sender._id === currentUserId ? 'bg-indigo-500 text-white' : 'bg-white'
              } p-3 rounded-lg max-w-[75%]`}>
            {msg.imageUrl && (
              <div>
                <img
                  src={msg.imageUrl}
                  alt="Attachment"
                  className="mt-2 max-h-60 object-cover cursor-pointer"
                  onClick={() => handleImageClick(msg.imageUrl)}
                />

              </div>
            )}
            <p className={`text-sm font-inter ${msg.imageUrl ? 'mt-4' : ''}`}>{msg.content}</p>
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
          <div className="w-8 h-8 border rounded-full overflow-hidden mr-2"></div>
          <ReactLoading type="bubbles" color="#808080" height={50} width={50} />
        </div>
      )}

      {showEmojiPicker && (
        <div className=" bottom-full mb-2 left-1">
          <EmojiPicker open={showEmojiPicker} onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <div className="  fixed bottom-4  flex items-center gap-2 bg-white p-3 rounded-lg w-[1000px]">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => handleChange(e)}
          onBlur={() => {
            setIsTyping(false);
            socket.emit('stopTyping', { chatId, sender: currentUserId });
          }}
          
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}

          className="flex-1 bg-transparent focus:outline-none bg-fixed "
        />
        <SmileIcon onClick={toggleEmojiPicker} className="w-4 h-4 text-gray-500 cursor-pointer" />

        <label className="cursor-pointer">
          <input type="file" className="hidden" onChange={handleAttachmentChange} />
          <AttachmentIcon className="w-5 h-5 text-gray-500" />
        </label>

        <button onClick={handleSend} className="text-gray-500 hover:text-gray-700 p-1">
          <SendIcon className="w-5 h-5 text-indigo-500" />
          <span className="sr-only">Send</span>
        </button>
      </div>

      {attachment && (
        <div className="flex items-center gap-2 mb-14 ">
          <img
            src={URL.createObjectURL(attachment)}
            alt="Selected Attachment"
            className="w-16 h-16 object-cover rounded-md"
          />
          <button
            onClick={handleRemoveAttachment}
            className="text-red-500 hover:text-red-700">
            &times;
          </button>
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
          <div className="relative max-w-xl max-h-full mx-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-white rounded-full text-black w-8 h-8 flex items-center justify-center">
              &times;
            </button>
            <img src={selectedImage} alt="Selected Attachment" className="max-w-full max-h-[80vh] object-contain" />
            <DownloadButton url={selectedImage} fileName="attachment" />
          </div>
        </div>
      )}
    </div>
  );
}