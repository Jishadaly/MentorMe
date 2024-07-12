import express from 'express';
import authController from '../../../adaptors/Controllers/authController';
import mentorController from '../../../adaptors/Controllers/mentorController';
import protect from '../../middlewares/jwt/authMiddleware';
import menteeController from '../../../adaptors/Controllers/menteeController';
import blogController from '../../../adaptors/Controllers/blogController';
import checkRole from '../../middlewares/jwt/checkRole';



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

//mentor?
userRouter.get('/getMentor' ,protect, mentorController.getMentor);
userRouter.get('/getMentorApplication', protect, mentorController.getApplicationId);


//mentee ?
userRouter.get('/getMentors', protect,checkRole('any'), mentorController.getMentors);
userRouter.get('/getMentee' , protect , menteeController.getMentee);
userRouter.post('/editProfile',protect,menteeController.editProfile);   


//slot ?
userRouter.post('/addSlots' ,protect, mentorController.addSlots);
userRouter.delete('/deleteSlot' , protect,mentorController.deleteSlot)
userRouter.post('/slotBooking' ,protect, mentorController.slotBooking);
userRouter.post('/create-checkout-session' ,protect, mentorController.createCheckoutSession)
userRouter.post('/webhooks', mentorController.webhook);
userRouter.get('/getBookedSlotes',protect,mentorController.getBookedSlotes);


//blogs
userRouter.post('/addBlog',protect,blogController.addBlog);
userRouter.get('/getAllblogs' , protect , blogController.getAllBlogs);
userRouter.get('/getBlog' , protect , blogController.getBlog);
userRouter.get('/getmentorBlog' , protect , blogController.getMentorBlog);
userRouter.post('/updateBlog' , protect , blogController.updateBlog);
userRouter.delete('/deleteBlog' , protect , blogController.deleteBlog);


export default userRouter;