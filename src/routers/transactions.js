import { Router } from 'express';
import { upload } from '../middlewares/upload.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { deleteTransactionController } from '../controllers/transactions.js';

import {
    getTransactionController,
    getTransactionByIdController,
    addTransactionController,
    upsertTransactionController,
    patchTransactionController,
    deleteTransactionController,
  } from '../controllers/transactions.js'; // а чи є чи може буде така папка "controllers"?

import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

import { validateBody } from '../utils/validateBody.js';

import { contactAddSchema, contactUpdateSchema } from '../validation/transaction.js';

// export const transactionsRouter = Router();
const contactsRouter = Router();

contactsRouter.use(authenticate);

// Rout для отримання всіх транзакцій
contactsRouter.get('/', ctrlWrapper(getTransactionsController));

contactsRouter.get('/:id',  isValidId, ctrlWrapper(getTransactionsByIdController));

// Rout для додавання транзакції
contactsRouter.post('/', upload.single('photo'), validateBody(transactionAddSchema), ctrlWrapper(addTransactionController));


// Rout для оновлення транзакції

transactionsRouter.delete(
  '/:transactionId',
  isValidId,
  ctrlWrapper(deleteTransactionController),
);

export default transactionsRouter;
