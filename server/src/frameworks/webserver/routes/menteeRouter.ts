import express from 'express'
import menteeController from '../../../adaptors/Controllers/menteeController'
import protect from '../../middlewares/jwt/authMiddleware'
import checkRole from '../../middlewares/jwt/checkRole'
import checkBlocked from '../../middlewares/jwt/checkBlocked'
const menteeRouter = express.Router()

menteeRouter.get('/getMentee' , protect ,checkBlocked,checkRole(['mentee']), menteeController.getMentee);
menteeRouter.post('/editProfile',protect,menteeController.editProfile);
menteeRouter.post('/postFeedback' , protect , checkBlocked , checkRole(['mentee']), menteeController.postFeedback);
menteeRouter.get('/getMentorReview',protect,checkBlocked,checkRole(['mentee']),menteeController.getMentorReviews);
menteeRouter.get('/searchMentors',protect,checkBlocked ,checkRole(['mentee']),menteeController.searchMentor);

export default menteeRouter;