
// ============================================
// 2. ChatSidebar Component
// ============================================
import React, { useState } from 'react';
import { FiSearch, FiRefreshCw, FiX } from 'react-icons/fi';
import moment from 'moment';

export default function ChatSidebar({
  chats,
  selectedChatId,
  onSelectChat,
  loading,
  currentUserId,
  onlineUsers,
  onRefresh
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setTimeout(() => setRefreshing(false), 500);
  };

  const filteredChats = chats.filter(chat => {
    const otherUser = chat.users.find(u => u._id !== currentUserId);
    return otherUser?.userName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiRefreshCw 
              className={`text-gray-600 ${refreshing ? 'animate-spin' : ''}`} 
              size={20} 
            />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredChats.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-gray-500">
              {searchTerm ? 'No conversations found' : 'No messages yet'}
            </p>
          </div>
        ) : (
          filteredChats.map((chat) => {
            const otherUser = chat.users.find(u => u._id !== currentUserId);
            const isSelected = chat._id === selectedChatId;
            const isOnline = onlineUsers.has(otherUser?._id);
            const hasUnread = chat.unreadCount > 0;
            const isLatestUnread = chat.latestMessage?.sender?._id !== currentUserId && !chat.latestMessage?.isRead;

            return (
              <div
                key={chat._id}
                onClick={() => onSelectChat(chat._id)}
                className={`
                  flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100
                  transition-colors
                  ${isSelected 
                    ? 'bg-indigo-50 border-l-4 border-l-indigo-600' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={otherUser?.profilePic}
                    alt={otherUser?.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                  {hasUnread && !isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {otherUser?.userName}
                    </h3>
                    {chat.latestMessage && (
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {moment(chat.latestMessage.createdAt).fromNow(true)}
                      </span>
                    )}
                  </div>
                  {chat.latestMessage && (
                    <p className={`
                      text-sm truncate
                      ${isLatestUnread && !isSelected ? 'font-semibold text-gray-900' : 'text-gray-600'}
                    `}>
                      {chat.latestMessage.sender?._id === currentUserId && 'You: '}
                      {chat.latestMessage.imageUrl ? '📷 Photo' : chat.latestMessage.content}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}