// import { Server } from 'socket.io';
// import { Server as HttpServer } from 'http';

// export const configureSocket = (server: HttpServer) => {
//   const io = new Server(server, {
//     cors: {
//       origin: process.env.CLIENT_URL, 
//       methods: ["GET", "POST"]
//     }
//   });

//   io.on('connection', (socket: any) => {
    
//     socket.on('joinChat', (chatId: any) => {
//       socket.join(chatId); 
//       console.log(`User joined chat: ${chatId}`);
//     });
    
//     socket.on('typing', (data:any) => {
//       socket.to(data.chatId).emit('typing', data);
//     });
  
//     socket.on('stopTyping', (data:any) => {
//       socket.to(data.chatId).emit('stopTyping', data);
//     });

//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });

//   return io;
// };


// ============================================
// 1. Improved Socket Configuration
// ============================================
import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

const onlineUsers = new Map<string, string>(); // userId -> socketId

export const configureSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // User comes online
    socket.on('userOnline', (userId: string) => {
      onlineUsers.set(userId, socket.id);
      io.emit('userStatusChange', { userId, isOnline: true });
      console.log(`User ${userId} is online`);
    });

    // Join specific chat
    socket.on('joinChat', (chatId: string) => {
      socket.join(chatId);
      console.log(`Socket ${socket.id} joined chat: ${chatId}`);
    });

    // Leave chat
    socket.on('leaveChat', (chatId: string) => {
      socket.leave(chatId);
      console.log(`Socket ${socket.id} left chat: ${chatId}`);
    });

    // Send message
    socket.on('sendMessage', (data: any) => {
      socket.to(data.chatId).emit('receiveMessage', data);
      
      // Emit new message notification to all users in chat
      io.to(data.chatId).emit('newMessage', data);
    });

    // Typing indicators
    socket.on('typing', (data: { chatId: string; sender: string }) => {
      socket.to(data.chatId).emit('typing', data);
    });

    socket.on('stopTyping', (data: { chatId: string; sender: string }) => {
      socket.to(data.chatId).emit('stopTyping', data);
    });

    // Disconnect
    socket.on('disconnect', () => {
      // Find and remove user from online users
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          io.emit('userStatusChange', { userId, isOnline: false });
          console.log(`User ${userId} went offline`);
          break;
        }
      }
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};
