import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserController, patchUserController } from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { patchUserSchema } from '../validation/user.js';
import { validateBody } from '../utils/validateBody.js';

export const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get('/current', ctrlWrapper(getUserController));

usersRouter.patch(
  '/current',
  upload.single('photo'),
  validateBody(patchUserSchema),
  ctrlWrapper(patchUserController),
);
