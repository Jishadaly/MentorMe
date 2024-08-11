import express from 'express';
import adminController from "../../../adaptors/Controllers/adminController";
import authController from '../../../adaptors/Controllers/authController';
import protect from '../../middlewares/jwt/authMiddleware';

const adminRouter = express.Router();

adminRouter.post('/login', authController.adminLogin);
adminRouter.get('/getVerificationMentors',protect,adminController.getVerificationMentors);
adminRouter.post('/verifyMentorRequest',protect,adminController.verifyRequest)
adminRouter.post('/rejectMentorApplication',protect,adminController.rejectRequest)
adminRouter.get('/getAllUsers',protect,adminController.getAllUsers)
adminRouter.get('/getAllMentors',protect, adminController.getAllMentors)
adminRouter.patch('/updateBlockStatus',protect, adminController.updateBlockStatus)
adminRouter.get('/ferchMentoSlots',protect, adminController.fetchSlots)
adminRouter.get('/fetchChartData',protect, adminController.fetchChartData)
adminRouter.patch('/updateBlogStatus',protect, adminController.updateBlogStatus)
adminRouter.get('/getDashboardStatus',protect, adminController.getDashboardStatus)

export default adminRouter;