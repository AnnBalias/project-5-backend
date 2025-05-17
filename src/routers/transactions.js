import { Router } from 'express';
import { upload } from '../middlewares/upload.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { deleteTransactionController } from '../controllers/transactions.js';

import {
    getTransactionController,
    getTransactionByIdController,
    addTransactionController,
    // upsertTransactionController,
    // patchTransactionController,
} from '../controllers/transactions.js';

// import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

import { validateBody } from '../utils/validateBody.js';

import { transactionAddSchema, transactionUpdateSchema } from '../validation/transaction.js';

// export const transactionsRouter = Router();
const transactionsRouter = Router();

transactionsRouter.use(authenticate);

// Rout для отримання всіх транзакцій
transactionsRouter.get('/', ctrlWrapper(getTransactionController));

transactionsRouter.get('/:id',  isValidId, ctrlWrapper(getTransactionByIdController));

// Rout для додавання транзакції
transactionsRouter.post('/', upload.single('photo'), validateBody(transactionAddSchema), ctrlWrapper(addTransactionController));


// Rout для оновлення транзакції

transactionsRouter.delete(
  '/:transactionId',
  isValidId,
  ctrlWrapper(deleteTransactionController),
);

export default transactionsRouter;