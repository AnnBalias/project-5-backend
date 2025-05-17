import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../utils/validateBody.js';
import { transactionAddSchema } from '../validation/transaction.js';
import {
  getTransactionController,
  getTransactionByIdController,
  addTransactionController,
  deleteTransactionController,
  patchTransactionController,
} from '../controllers/transactions.js';

import { patchTransactionSchema } from '../validation/transaction.js';
//import { patchTransactionController } from '../controllers/transaction.js';

export const transactionsRouter = Router();

transactionsRouter.use(authenticate);

// Get all transactions
transactionsRouter.get('/', ctrlWrapper(getTransactionController));

// Get transaction by ID
transactionsRouter.get('/:id', isValidId, ctrlWrapper(getTransactionByIdController));

// Add new transaction
transactionsRouter.post('/', validateBody(transactionAddSchema), ctrlWrapper(addTransactionController));

// Rout для оновлення транзакції
transactionsRouter.patch(
  '/:transactionId',
  isValidId,
  validateBody(patchTransactionSchema),
  ctrlWrapper(patchTransactionController),
);

// Delete transaction
transactionsRouter.delete('/:transactionId', isValidId, ctrlWrapper(deleteTransactionController));

export default transactionsRouter;