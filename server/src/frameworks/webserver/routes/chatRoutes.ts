import express from 'express';
import protect from '../../middlewares/jwt/authMiddleware';

const chatRouter = express.Router();

export default chatRouter;

