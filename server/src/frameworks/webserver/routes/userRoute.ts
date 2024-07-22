import express from 'express';
import authController from '../../../adaptors/Controllers/authController';
import mentorController from '../../../adaptors/Controllers/mentorController';
import protect from '../../middlewares/jwt/authMiddleware';
import menteeController from '../../../adaptors/Controllers/menteeController';
import checkRole from '../../middlewares/jwt/checkRole';
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
userRouter.post('/uploadProfilePicture',protect,parser.single("profilePicture"),authController.uploadProfile);

//mentor?
userRouter.get('/getMentor' ,protect, mentorController.getMentor);
userRouter.get('/getMentorApplication', protect, mentorController.getApplicationId);
userRouter.get('/getMentorDetails' ,protect, mentorController.getMentorDetails);
userRouter.put('/updateMentor' ,protect, mentorController.updateMentorProfile);


//mentee ?
userRouter.get('/getMentors', protect,checkRole('any'), mentorController.getMentors);
userRouter.get('/getMentee' , protect ,checkRole('mentee'), menteeController.getMentee);
userRouter.post('/editProfile',protect,menteeController.editProfile);  

//slot ?
userRouter.post('/addSlots' ,protect, mentorController.addSlots);
userRouter.delete('/deleteSlot' , protect,mentorController.deleteSlot)
userRouter.post('/slotBooking' ,protect, mentorController.slotBooking);
userRouter.post('/create-checkout-session' ,protect, mentorController.createCheckoutSession)
userRouter.post('/webhooks', mentorController.webhook);
userRouter.get('/getBookedSlotes',protect,mentorController.getBookedSlotes);

// <<<<<<< HEAD
// =======
// //blogs
// userRouter.post('/addBlog',protect,parser.single("image"),blogController.addBlog);
// userRouter.get('/getAllblogs' , protect , blogController.getAllBlogs);
// userRouter.get('/getBlog' , protect , blogController.getBlog);
// userRouter.get('/getmentorBlog' , protect , blogController.getMentorBlog);
// userRouter.post('/updateBlog' , protect,parser.single('image') , blogController.updateBlog);
// userRouter.delete('/deleteBlog' , protect , blogController.deleteBlog);


// >>>>>>> chat
export default userRouter;