import express from 'express';
import adminController from "../../../adaptors/Controllers/adminController";
import authController from '../../../adaptors/Controllers/authController';

const adminRouter = express.Router();

adminRouter.post('/login', authController.adminLogin);
adminRouter.get('/getVerificationMentors',adminController.getVerificationMentors);
adminRouter.post('/verifyMentorRequest',adminController.verifyRequest)
adminRouter.post('/rejectMentorApplication',adminController.rejectRequest)
adminRouter.get('/getAllUsers',adminController.getAllUsers)
adminRouter.get('/getAllMentors',adminController.getAllMentors)
adminRouter.patch('/updateBlockStatus',adminController.updateBlockStatus)
adminRouter.get('/ferchMentoSlots',adminController.fetchSlots)

export default adminRouter;