import express from 'express';
import adminController from "../../../adaptors/Controllers/adminController";
import authController from '../../../adaptors/Controllers/authController';

const adminRouter = express.Router();

adminRouter.post('/api/admin/login', authController.adminLogin)
adminRouter.get('/api/admin/getVerificationMentors',adminController.getVerificationMentors);
adminRouter.post('/api/admin/verifyMentorRequest',adminController.verifyRequest)
adminRouter.post('/api/admin/rejectMentorApplication',adminController.rejectRequest)




export default adminRouter;