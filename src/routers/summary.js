import { Router } from 'express';
import { getSummary } from '../controllers/summaryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const summaryRouter = Router();

summaryRouter.get('/:yearMonth', authMiddleware, getSummary);

export default summaryRouter;
