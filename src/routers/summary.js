import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getSummary } from '../controllers/summaryController.js';

const summaryRouter = Router();

summaryRouter.get('/:period', authMiddleware, getSummary);

export default summaryRouter;
