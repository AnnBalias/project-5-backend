import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  deleteTransactionController,
  patchTransactionController,
} from '../controllers/transactions.js';
import { authenticate } from '../middlewares/authenticate.js';

import { validateBody } from '../utils/validateBody.js';
import { patchTransactionSchema } from '../validation/transaction.js';
//import { patchTransactionController } from '../controllers/transaction.js';

export const transactionsRouter = Router();

transactionsRouter.use(authenticate);

// Rout для додавання транзакції

// Rout для оновлення транзакції
transactionsRouter.patch(
  '/:transactionId',
  isValidId,
  validateBody(patchTransactionSchema),
  ctrlWrapper(patchTransactionController),
);

transactionsRouter.delete(
  '/:transactionId',
  isValidId,
  ctrlWrapper(deleteTransactionController),
);

// Rout для отримання всіх транзакцій
