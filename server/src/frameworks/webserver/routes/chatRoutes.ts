import express from 'express';
import protect from '../../middlewares/jwt/authMiddleware';
import chatController from '../../../adaptors/Controllers/chatController';
const parser = require('../../../config/cloudinary.config');

const chatRouter = express.Router();

chatRouter.get('/startChat',chatController.startChat)
chatRouter.post('/sendMessage',protect,parser.single('image'),chatController.sendMessage);
chatRouter.get('/getAllChats',protect,chatController.getAllChats);
chatRouter.get('/fetchMessages',protect,chatController.fetchMessages);

export default chatRouter;

