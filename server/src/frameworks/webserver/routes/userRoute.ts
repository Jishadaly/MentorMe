import express from 'express';
import authController from '../../../adaptors/Controllers/authController';
import mentorController from '../../../adaptors/Controllers/mentorController';
import protect from '../../middlewares/jwt/authMiddleware';
import menteeController from '../../../adaptors/Controllers/menteeController';
import blogController from '../../../adaptors/Controllers/blogController';
import checkRole from '../../middlewares/jwt/checkRole';



const userRouter = express.Router();

// auth?
userRouter.post('/api/user/signup',authController.userRegistration);
userRouter.post('/api/user/verifyOTP' , authController.verifyOTP);
userRouter.get('/api/user/resendOtp' , authController.resendOtp);
userRouter.post('/api/user/login',authController.userLogin);
userRouter.post('/api/user/googleLogin' , authController.googleAuth);
userRouter.post('/api/user/mentorLogin',authController.mentorLogin);
userRouter.post('/api/user/mentorAppicationForm',mentorController.mentorApplicationFormSub);
userRouter.post('/api/user/refreshToken',authController.refreshToken)

//mentor?

userRouter.get('/api/user/getMentor' ,protect, mentorController.getMentor);
userRouter.post('/api/user/addSlots' ,protect, mentorController.addSlots);
userRouter.get('/api/user/getMentorApplication', protect, mentorController.getApplicationId)
userRouter.delete('/api/user/deleteSlot' , protect,mentorController.deleteSlot)

//booking?
userRouter.post('/api/user/slotBooking' ,protect, mentorController.slotBooking);
userRouter.post('/api/user/create-checkout-session' ,protect, mentorController.createCheckoutSession)
userRouter.post('/webhooks', mentorController.webhook);
userRouter.get('/api/user/getBookedSlotes',protect,mentorController.getBookedSlotes);

//mentee ?
userRouter.get('/api/user/getMentors', protect,checkRole('any'), mentorController.getMentors);
userRouter.get('/api/user/getMentee' , protect , menteeController.getMentee);
userRouter.post('/api/user/editProfile',protect,menteeController.editProfile);

//slot ?


//blogs
userRouter.post('/api/user/addBlog',protect,blogController.addBlog);
userRouter.get('/api/user/getAllblogs' , protect , blogController.getAllBlogs);
userRouter.get('/api/user/getBlog' , protect , blogController.getBlog);
userRouter.get('/api/user/getmentorBlog' , protect , blogController.getMentorBlog);
userRouter.post('/api/user/updateBlog' , protect , blogController.updateBlog);
userRouter.delete('/api/user/deleteBlog' , protect , blogController.deleteBlog);


export default userRouter;  

