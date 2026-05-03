
// ============================================
// 4. ChatEmpty Component
// ============================================
import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';

export default function ChatEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-center p-6">
      <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
        <FiMessageCircle className="text-indigo-600" size={48} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Mentorship Chat
      </h2>
      <p className="text-gray-600 mb-1 max-w-md">
        Connect with mentors and receive guidance on your personal and professional growth.
      </p>
      <p className="text-gray-500 text-sm max-w-md">
        Select a conversation from the sidebar to start messaging
      </p>
      <p className="text-xs text-gray-400 mt-8">
        🔒 Your conversations are private and secure
      </p>
    </div>
  );
}