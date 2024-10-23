import express from 'express';
import authRouter from './authRoute';
import mentorRouter from './mentorRouter';
import menteeRouter from './menteeRouter';
import slotRouter from './slotRoute';

const userRouter = express.Router(); 

userRouter.use(authRouter);
userRouter.use(mentorRouter);
userRouter.use(menteeRouter);
userRouter.use(slotRouter);

export default userRouter;