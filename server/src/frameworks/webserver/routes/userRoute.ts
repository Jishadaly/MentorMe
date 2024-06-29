import express from 'express';
import authController from '../../../adaptors/Controllers/authController';
import mentorController from '../../../adaptors/Controllers/mentorController';
import verifyToken from '../../middlewares/jwt/authMiddleware';
// import bodyParser from 'body-parser';

const userRouter = express.Router();

// User?
userRouter.post('/api/user/signup',authController.userRegistration);
userRouter.post('/api/user/verifyOTP' , authController.verifyOTP);
userRouter.get('/api/user/resendOtp' , authController.resendOtp);
userRouter.post('/api/user/login',authController.userLogin);
userRouter.post('/api/user/googleLogin' , authController.googleAuth);

//mentor?
userRouter.post('/api/user/mentorLogin',authController.mentorLogin);
userRouter.post('/api/user/mentorAppicationForm',mentorController.mentorApplicationFormSub);
userRouter.get('/api/user/getMentors',verifyToken,mentorController.getMentors);
userRouter.get('/api/user/getMentor' , mentorController.getMentor);
userRouter.post('/api/user/addSlots' , mentorController.addSlots);
userRouter.get('/api/user/getMentorApplication' , mentorController.getApplicationId)
userRouter.post('/api/user/slotBooking' , mentorController.slotBooking);
userRouter.post('/api/user/create-checkout-session' , mentorController.createCheckoutSession)
// userRouter.post('/api/user/create-checkout-session' , mentorController.createCheckoutSession)
userRouter.delete('/api/user/deleteSlot' , mentorController.deleteSlot)
userRouter.post('/webhooks', mentorController.webhook);
userRouter.get('/api/user/getBookedSlotes',mentorController.getBookedSlotes)


export default userRouter;  