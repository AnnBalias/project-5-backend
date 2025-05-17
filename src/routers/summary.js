import { Router } from 'express';
import { getSummaryByPeriod } from '../controllers/summaryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const summaryRouter = Router();

summaryRouter.get('/:yearMonth', authMiddleware, getSummaryByPeriod);

export default summaryRouter;
