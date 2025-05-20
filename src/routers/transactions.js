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

export const transactionsRouter = Router();

transactionsRouter.use(authenticate);

transactionsRouter.get('/', ctrlWrapper(getTransactionController));

transactionsRouter.get(
  '/:transactionId',
  isValidId,
  ctrlWrapper(getTransactionByIdController),
);

transactionsRouter.post(
  '/',
  validateBody(transactionAddSchema),
  ctrlWrapper(addTransactionController),
);

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

export default transactionsRouter;
