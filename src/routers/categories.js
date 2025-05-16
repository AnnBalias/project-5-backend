import { Router } from 'express';
import { getCategories } from '../services/categories.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const categoriesRouter = Router();

categoriesRouter.get('/', ctrlWrapper(getCategories));
