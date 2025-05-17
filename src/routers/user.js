import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserController } from '../controllers/user.js';

export const userRouter = Router();

userRouter.get('/:userId', ctrlWrapper(getUserController));
