import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { deleteTransactionController } from '../controllers/transactions.js';

import { validateBody } from '../utils/validateBody.js';
import { patchTransactionSchema } from '../validation/transaction.js';
//import { patchTransactionController } from '../controllers/transaction.js';

export const transactionsRouter = Router();

// Rout для додавання транзакції

// Rout для оновлення транзакції
transactionsRouter.patch(
  '/:transactionId',
  isValidId,
  //   upload.single('photo'),
  validateBody(patchTransactionSchema),
  //ctrlWrapper(patchContactsController),
);

transactionsRouter.delete(
  '/:transactionId',
  isValidId,
  ctrlWrapper(deleteTransactionController),
);

// Rout для отримання всіх транзакцій
