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
} from '../controllers/transactions.js';

const transactionsRouter = Router();

transactionsRouter.use(authenticate);

// Get all transactions
transactionsRouter.get('/', ctrlWrapper(getTransactionController));

// Get transaction by ID
transactionsRouter.get('/:id', isValidId, ctrlWrapper(getTransactionByIdController));

// Add new transaction
transactionsRouter.post('/', validateBody(transactionAddSchema), ctrlWrapper(addTransactionController));

// Delete transaction
transactionsRouter.delete('/:transactionId', isValidId, ctrlWrapper(deleteTransactionController));

export default transactionsRouter;