import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export const configureSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket: any) => {
    console.log('A user connected');

    socket.on('joinChat', (chatId: any) => {
      socket.join(chatId); 
      console.log(`User joined chat: ${chatId}`);
    });

    socket.on('sendMessage', (data: any) => {
      console.log('Message received:', data);
      io.to(data.chatId).emit('receiveMessage', data); 
    });

    socket.on('typing', (data:any) => {
      socket.to(data.chatId).emit('typing', data);
    });
  
    socket.on('stopTyping', (data:any) => {
      socket.to(data.chatId).emit('stopTyping', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};
