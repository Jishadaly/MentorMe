import express, { Application} from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { configureExpress } from './config/expressConfig';
import userRouter from './frameworks/webserver/routes/userRoute';
import adminRouter from './frameworks/webserver/routes/adminRoute';
import blogRouter from './frameworks/webserver/routes/blogRoute';
import chatRouter from './frameworks/webserver/routes/chatRoutes';
const app:Application = express();
const port = 3000;
import { configureSocket } from './config/socketConfig';

app.use(express.json());
configureExpress(app)


app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)
app.use('/api/user',blogRouter)
app.use('/api/chat',chatRouter)


const server = http.createServer(app);
const io = configureSocket(server);


// io.on('connection', (socket: any) => {
//   console.log('A user connected');

//   socket.on('joinChat', (chatId: any) => {
//     socket.join(chatId); // Join the specific chat room
//     console.log(`User joined chat: ${chatId}`);
//   });

//   socket.on('sendMessage', (data: any) => {
//     console.log('Message received:', data);
//     io.to(data.chatId).emit('receiveMessage', data); // Emit the message to the specific chat room;
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

server.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});