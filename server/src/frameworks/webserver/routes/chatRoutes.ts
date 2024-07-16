import express from 'express';
import protect from '../../middlewares/jwt/authMiddleware';
import chatController from '../../../adaptors/Controllers/chatController';

const chatRouter = express.Router();

chatRouter.get('/startChat',chatController.startChat)
chatRouter.post('/sendMessage',protect,chatController.sendMessage);
chatRouter.get('/getAllChats',protect,chatController.getAllChats);
chatRouter.get('/fetchMessages',protect,chatController.fetchMessages);

export default chatRouter;

