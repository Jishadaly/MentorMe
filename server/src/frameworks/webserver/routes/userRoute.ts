import express from 'express';
import { userRegistration } from '../../../adaptors/Controllers/authController';


const userRouter = express.Router();



userRouter.post('/api/user/signup',userRegistration)

export default userRouter;