import { Router } from 'express';
import { getSummary } from '../controllers/summaryController.js';
import { authenticate } from '../middlewares/authenticate.js';

export const summaryRouter = Router();

summaryRouter.use(authenticate);

summaryRouter.get('/:period', getSummary);
