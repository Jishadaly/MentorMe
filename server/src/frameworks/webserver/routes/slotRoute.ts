import express from 'express'
import mentorController from '../../../adaptors/Controllers/mentorController'
import protect from '../../middlewares/jwt/authMiddleware'
import checkRole from '../../middlewares/jwt/checkRole'
import checkBlocked from '../../middlewares/jwt/checkBlocked'

const slotRouter = express.Router()

slotRouter.post('/addSlots' ,protect, mentorController.addSlots);
slotRouter.delete('/deleteSlot' , protect,mentorController.deleteSlot);
slotRouter.post('/slotBooking' ,protect, mentorController.slotBooking);
slotRouter.post('/create-checkout-session' ,protect, mentorController.createCheckoutSession);
slotRouter.post('/webhooks', mentorController.webhook);
slotRouter.get('/getBookedSlotes',protect,mentorController.getBookedSlotes);
slotRouter.get('/mentorSessions',protect,mentorController.getMentorSessions);
slotRouter.patch('/UpdateSessionStatus',protect,checkBlocked , checkRole(['mentor']),mentorController.updateSessionStatus);

export default slotRouter;