import express from 'express';
import authController from '../../../adaptors/Controllers/authController';
import mentorController from '../../../adaptors/Controllers/mentorController';
import verifyToken from '../../middlewares/jwt/authMiddleware';
import menteeController from '../../../adaptors/Controllers/menteeController';

// import blogController from '../../../adaptors/Controllers/blogController';
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

//mentor?

userRouter.get('/api/user/getMentor' ,verifyToken, mentorController.getMentor);
userRouter.post('/api/user/addSlots' ,verifyToken, mentorController.addSlots);
userRouter.get('/api/user/getMentorApplication', verifyToken, mentorController.getApplicationId)
userRouter.delete('/api/user/deleteSlot' , verifyToken,mentorController.deleteSlot)

//booking?
userRouter.post('/api/user/slotBooking' ,verifyToken, mentorController.slotBooking);
userRouter.post('/api/user/create-checkout-session' ,verifyToken, mentorController.createCheckoutSession)
userRouter.post('/webhooks', mentorController.webhook);
userRouter.get('/api/user/getBookedSlotes',verifyToken,mentorController.getBookedSlotes);

//mentee ?
userRouter.get('/api/user/getMentors', verifyToken,checkRole('any'), mentorController.getMentors);
userRouter.get('/api/user/getMentee' , verifyToken , menteeController.getMentee);
userRouter.post('/api/user/editProfile',verifyToken,menteeController.editProfile);

//slot ?


//blogs
// userRouter.post('/api/user/addBlog',verifyToken,blogController.addBlog);
// userRouter.get('/api/user/getAllblogs' , verifyToken , blogController.getAllBlogs);
// userRouter.get('/api/user/getBlog' , verifyToken , blogController.getBlog);
// userRouter.get('/api/user/getmentorBlog' , verifyToken , blogController.getMentorBlog);
// userRouter.post('/api/user/updateBlog' , verifyToken , blogController.updateBlog);
// userRouter.delete('/api/user/deleteBlog' , verifyToken , blogController.deleteBlog);






export default userRouter;  
