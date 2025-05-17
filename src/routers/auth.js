import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../utils/validateBody.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../utils/validateBody.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

// Rout для login-у

// Rout для logout-y
