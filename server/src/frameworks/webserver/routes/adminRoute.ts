import express from 'express';
import adminController from "../../../adaptors/Controllers/adminController";
import authController from '../../../adaptors/Controllers/authController';
import protectAdmin from '../../middlewares/jwt/adminAuthmiddleware';
const adminRouter = express.Router();

adminRouter.post('/login', authController.adminLogin);
adminRouter.get('/getVerificationMentors',protectAdmin,adminController.getVerificationMentors);
adminRouter.post('/verifyMentorRequest',protectAdmin,adminController.verifyRequest)
adminRouter.post('/rejectMentorApplication',protectAdmin,adminController.rejectRequest)
adminRouter.get('/getAllUsers',protectAdmin,adminController.getAllUsers)
adminRouter.get('/getAllMentors',protectAdmin, adminController.getAllMentors)
adminRouter.patch('/updateBlockStatus',protectAdmin, adminController.updateBlockStatus)
adminRouter.get('/ferchMentoSlots',protectAdmin, adminController.fetchSlots)
adminRouter.get('/fetchChartData',protectAdmin, adminController.fetchChartData)
adminRouter.patch('/updateBlogStatus',protectAdmin, adminController.updateBlogStatus)
adminRouter.get('/getDashboardStatus',protectAdmin, adminController.getDashboardStatus)

export default adminRouter;