import { Router } from 'express';
import { getCategories } from '../services/categories.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

export const categoriesRouter = Router();

categoriesRouter.use(authenticate);

categoriesRouter.get('/', ctrlWrapper(getCategories));
