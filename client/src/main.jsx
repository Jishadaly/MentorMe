import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChatProvider } from './Context/chatContext';
import './config/timeAgoConfig';

// Get the root element
const rootElement = document.getElementById('root');

// Ensure the root element is not null
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
     <ChatProvider>
      <App />
    </ChatProvider>
    // </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element. Please ensure there is an element with id="root" in your index.html.');
}
