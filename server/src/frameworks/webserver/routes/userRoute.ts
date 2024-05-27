import express from 'express';
import { userRegistration } from '../../../adaptors/Controllers/authController';


const userRouter = express.Router();



userRouter.post('/signup',userRegistration)

export default userRouter;