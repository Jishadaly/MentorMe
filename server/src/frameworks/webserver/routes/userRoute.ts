import express from 'express';
import authController from '../../../adaptors/Controllers/authController';
import mentorController from '../../../adaptors/Controllers/mentorController';
import protect from '../../middlewares/jwt/authMiddleware';
import menteeController from '../../../adaptors/Controllers/menteeController';
import checkRole from '../../middlewares/jwt/checkRole';
import checkBlocked from '../../middlewares/jwt/checkBlocked';
const parser = require('../../../config/cloudinary.config');
const userRouter = express.Router(); 

// auth?
userRouter.post('/signup',authController.userRegistration);
userRouter.post('/verifyOTP' , authController.verifyOTP);
userRouter.get('/resendOtp' , authController.resendOtp);
userRouter.post('/login',authController.userLogin);
userRouter.post('/googleLogin' , authController.googleAuth);
userRouter.post('/mentorLogin',authController.mentorLogin);
userRouter.post('/mentorAppicationForm',mentorController.mentorApplicationFormSub);
userRouter.post('/refreshToken',authController.refreshToken)
userRouter.post('/uploadProfilePicture',protect,checkRole(['mentee','mentor']),parser.single("profilePicture"),authController.uploadProfile);
userRouter.post('/sendForgotPasswordLink' ,authController.fogotPasswordLinkSend )
userRouter.post('/resetPassword',authController.resetPassword)

//mentor?
userRouter.get('/getMentor' ,protect,checkBlocked, mentorController.getMentor);
userRouter.get('/getMentorApplication', protect, mentorController.getApplicationId);
userRouter.get('/getMentorDetails' ,protect, mentorController.getMentorDetails);
userRouter.put('/updateMentor' ,protect, mentorController.updateMentorProfile);
userRouter.get('/getNotifications',protect,mentorController.getNotifications);
userRouter.patch('/editNotification',protect,mentorController.editNotification);
userRouter.get('/getMentorDashboard' , protect , checkBlocked , mentorController.getMentorDashboard);

//mentee ?
userRouter.get('/getMentors', protect,checkBlocked,checkRole(['mentee', 'mentor', 'admin']), mentorController.getMentors);
userRouter.get('/getMentee' , protect ,checkBlocked,checkRole(['mentee']), menteeController.getMentee);
userRouter.post('/editProfile',protect,menteeController.editProfile);
userRouter.post('/postFeedback' , protect , checkBlocked , checkRole(['mentee']), menteeController.postFeedback);
userRouter.get('/getMentorReview',protect,checkBlocked,checkRole(['mentee']),menteeController.getMentorReviews);
//slot ?
userRouter.post('/addSlots' ,protect, mentorController.addSlots);
userRouter.delete('/deleteSlot' , protect,mentorController.deleteSlot);
userRouter.post('/slotBooking' ,protect, mentorController.slotBooking);
userRouter.post('/create-checkout-session' ,protect, mentorController.createCheckoutSession);
userRouter.post('/webhooks', mentorController.webhook);
userRouter.get('/getBookedSlotes',protect,mentorController.getBookedSlotes);
userRouter.get('/mentorSessions',protect,mentorController.getMentorSessions);
userRouter.patch('/UpdateSessionStatus',protect,checkBlocked , checkRole(['mentor']),mentorController.updateSessionStatus);
export default userRouter;