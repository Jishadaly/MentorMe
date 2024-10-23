import express from 'express';
import authController from '../../../adaptors/Controllers/authController';
import checkRole from '../../middlewares/jwt/checkRole';
import protect from '../../middlewares/jwt/authMiddleware';
const parser = require('../../../config/cloudinary.config');
const authRouter = express.Router(); 

authRouter.post('/signup',authController.userRegistration);
authRouter.post('/verifyOTP' , authController.verifyOTP);
authRouter.get('/resendOtp' , authController.resendOtp);
authRouter.post('/login',authController.userLogin);
authRouter.post('/googleLogin' , authController.googleAuth);
authRouter.post('/mentorLogin',authController.mentorLogin);
authRouter.post('/refreshToken',authController.refreshToken)
authRouter.post('/uploadProfilePicture',protect,checkRole(['mentee','mentor']),parser.single("profilePicture"),authController.uploadProfile);
authRouter.post('/sendForgotPasswordLink' ,authController.fogotPasswordLinkSend )
authRouter.post('/resetPassword',authController.resetPassword)

export default authRouter;