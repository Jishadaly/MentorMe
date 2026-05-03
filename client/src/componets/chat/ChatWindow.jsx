
// ============================================
// 3. ChatWindow Component
// ============================================
import React, { useState, useEffect, useRef } from 'react';
import { getMessages, sendMessge } from '@/Api/services/chatServices';
import { 
  FiSend, FiPaperclip, FiSmile, FiX, FiDownload, 
  FiChevronLeft, FiMoreVertical 
} from 'react-icons/fi';
import EmojiPicker from 'emoji-picker-react';
import moment from 'moment';

export default function ChatWindow({ chatId, currentUserId, socket, onBack }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatId) {
      fetchMessages();
      socket.emit('joinChat', chatId);

      socket.on('receiveMessage', (newMessage) => {
        if (newMessage.chat === chatId) {
          setMessages(prev => [...prev, newMessage]);
          scrollToBottom();
        }
      });

      socket.on('typing', (data) => {
        if (data.chatId === chatId && data.sender !== currentUserId) {
          setIsTyping(true);
        }
      });

      socket.on('stopTyping', (data) => {
        if (data.chatId === chatId) {
          setIsTyping(false);
        }
      });

      return () => {
        socket.emit('leaveChat', chatId);
        socket.off('receiveMessage');
        socket.off('typing');
        socket.off('stopTyping');
      };
    }
  }, [chatId]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessages('chat/fetchMessages', chatId);
      setMessages(data);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim() && !attachment) return;

    try {
      setSending(true);
      const formData = new FormData();
      formData.append('chatId', chatId);
      formData.append('message', message);
      
      if (attachment) {
        formData.append('image', attachment);
      }

      const response = await sendMessge('chat/sendMessage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      socket.emit('sendMessage', { chatId, ...response });
      setMessages(prev => [...prev, response]);
      
      setMessage('');
      setAttachment(null);
      socket.emit('stopTyping', { chatId, sender: currentUserId });
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (!isTyping) {
      socket.emit('typing', { chatId, sender: currentUserId });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopTyping', { chatId, sender: currentUserId });
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      setAttachment(file);
    }
  };

  const otherUser = messages[0]?.sender?._id !== currentUserId 
    ? messages[0]?.sender 
    : messages.find(m => m.sender?._id !== currentUserId)?.sender;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiChevronLeft size={24} />
          </button>
          
          {otherUser && (
            <>
              <img
                src={otherUser.profilePic}
                alt={otherUser.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-900">{otherUser.userName}</h2>
                <p className="text-xs text-gray-500">
                  {isTyping ? 'typing...' : 'Active'}
                </p>
              </div>
            </>
          )}
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <FiMoreVertical size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const isOwn = msg.sender?._id === currentUserId;
              const showAvatar = index === 0 || messages[index - 1].sender?._id !== msg.sender?._id;
              const showTime = index === messages.length - 1 || 
                               messages[index + 1].sender?._id !== msg.sender?._id ||
                               moment(messages[index + 1].createdAt).diff(moment(msg.createdAt), 'minutes') > 5;

              return (
                <div
                  key={msg._id}
                  className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {showAvatar ? (
                    <img
                      src={msg.sender?.profilePic}
                      alt={msg.sender?.userName}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8" />
                  )}

                  <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    <div
                      className={`
                        px-4 py-2 rounded-2xl
                        ${isOwn 
                          ? 'bg-indigo-600 text-white rounded-br-sm' 
                          : 'bg-white border border-gray-200 text-gray-900 rounded-bl-sm'
                        }
                      `}
                    >
                      {msg.imageUrl && (
                        <img
                          src={msg.imageUrl}
                          alt="attachment"
                          className="max-w-sm rounded-lg cursor-pointer mb-2"
                          onClick={() => setSelectedImage(msg.imageUrl)}
                        />
                      )}
                      {msg.content && (
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {msg.content}
                        </p>
                      )}
                    </div>
                    {showTime && (
                      <span className="text-xs text-gray-500 mt-1 px-1">
                        {moment(msg.createdAt).format('h:mm A')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Attachment Preview */}
      {attachment && (
        <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
          <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-300">
            <img
              src={URL.createObjectURL(attachment)}
              alt="preview"
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {attachment.name}
              </p>
              <p className="text-xs text-gray-500">
                {(attachment.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              onClick={() => setAttachment(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <FiX size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-end gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiPaperclip size={20} className="text-gray-600" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiSmile size={20} className="text-gray-600" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={handleTyping}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2 bg-gray-100 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-32"
              style={{ minHeight: '40px' }}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={(!message.trim() && !attachment) || sending}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <FiSend size={20} />
            )}
          </button>
        </div>

        {showEmojiPicker && (
          <div className="absolute bottom-20 right-4">
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                setMessage(prev => prev + emojiData.emoji);
                setShowEmojiPicker(false);
              }}
            />
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100"
            >
              <FiX size={24} />
            </button>
            <img
              src={selectedImage}
              alt="full size"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <a
              href={selectedImage}
              download
              className="absolute bottom-4 right-4 p-3 bg-white rounded-full hover:bg-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <FiDownload size={24} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

