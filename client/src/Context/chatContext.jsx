import React, { createContext, useState, useContext } from 'react';

// Create a context for the chat
const ChatContext = createContext();

// Create a provider component
export const ChatProvider = ({ children }) => {
    const [chatId, setChatId] = useState(null);
    const [chats, setChats] = useState([]);

    return (
        <ChatContext.Provider value={{ chatId, setChatId , chats , setChats}}>
            {children}
        </ChatContext.Provider>
    );
};

// Custom hook to use the ChatContext
export const useChat = () => useContext(ChatContext);
