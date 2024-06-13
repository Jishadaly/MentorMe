import express from 'express';
import authController from '../../../adaptors/Controllers/authController';
import mentorController from '../../../adaptors/Controllers/mentorController';

const userRouter = express.Router();

userRouter.post('/api/user/signup',authController.userRegistration);
userRouter.post('/api/user/verifyOTP' , authController.verifyOTP);
userRouter.post('/api/user/login',authController.userLogin);
userRouter.post('/api/user/mentorLogin',authController.mentorLogin);
userRouter.post('/api/user/mentorAppicationForm',mentorController.mentorApplicationFormSub);
userRouter.get('/api/user/getMentors',mentorController.getMentors);
userRouter.post('/api/user/googleLogin' , authController.googleAuth)
userRouter.get('/api/user/getMentor' , mentorController.getMentor)


export default userRouter;  