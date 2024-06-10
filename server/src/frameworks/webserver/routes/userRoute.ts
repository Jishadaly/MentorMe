import express from 'express';
import authController from '../../../adaptors/Controllers/authController';
import mentorController from '../../../adaptors/Controllers/mentorController';

const userRouter = express.Router();

userRouter.post('/api/user/signup',authController.userRegistration);
userRouter.post('/api/user/verifyOTP' , authController.verifyOTP);
userRouter.post('/api/user/login',authController.userLogin);
userRouter.post('/api/user/mentorLogin',authController.userLogin);
userRouter.post('/api/user/mentorAppicationForm',mentorController.mentorApplicationFormSub);

export default userRouter;