import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserController } from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';

export const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get('/current', ctrlWrapper(getUserController));
