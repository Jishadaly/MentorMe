import express from 'express';
import mentorController from '../../../adaptors/Controllers/mentorController';
import protect from '../../middlewares/jwt/authMiddleware';
import checkRole from '../../middlewares/jwt/checkRole';
import checkBlocked from '../../middlewares/jwt/checkBlocked';
const mentorRouter = express.Router();

mentorRouter.post('/mentorAppicationForm',mentorController.mentorApplicationFormSub);
mentorRouter.get('/getMentor' ,protect,checkBlocked, mentorController.getMentor);
mentorRouter.get('/getMentorApplication', protect, mentorController.getApplicationId);
mentorRouter.get('/getMentorDetails' ,protect, mentorController.getMentorDetails);
mentorRouter.put('/updateMentor' ,protect, mentorController.updateMentorProfile);
mentorRouter.get('/getNotifications',protect,mentorController.getNotifications);
mentorRouter.patch('/editNotification',protect,mentorController.editNotification);
mentorRouter.get('/getMentorDashboard' , protect , checkBlocked , mentorController.getMentorDashboard);
// mentorRouter.get('/getMentors', protect,checkBlocked,checkRole(['mentee', 'mentor', 'admin']), mentorController.getMentors);
mentorRouter.get('/getMentors',mentorController.getMentors);



export default mentorRouter
