import express from 'express';
import protect from '../../middlewares/jwt/authMiddleware';
import chatController from '../../../adaptors/Controllers/chatController';

const chatRouter = express.Router();

chatRouter.get('/startChat',chatController.startChat)

export default chatRouter;

