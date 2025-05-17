import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { deleteTransactionController } from '../controllers/transactions.js';
import { authenticate } from '../middlewares/authenticate.js';

export const transactionsRouter = Router();

transactionsRouter.use(authenticate);

// Rout для додавання транзакції

// Rout для оновлення транзакції

transactionsRouter.delete(
  '/:transactionId',
  isValidId,
  ctrlWrapper(deleteTransactionController),
);

// Rout для отримання всіх транзакцій
