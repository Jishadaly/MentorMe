import express from 'express';
import adminController from "../../../adaptors/Controllers/adminController";
import authController from '../../../adaptors/Controllers/authController';

const adminRouter = express.Router();

adminRouter.post('/api/admin/login', authController.adminLogin)

export default adminRouter;