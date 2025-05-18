import createHttpError from 'http-errors';

import {
  getAllTransactions,
  getTransactionById,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from '../services/transactions.js';
import { UsersCollection } from '../db/models/user.js';

export const getTransactionController = async (req, res) => {
  const userId = req.user._id;
  const transactions = await getAllTransactions(userId);
  res.json(transactions);
  console.log('balance - ', req.user.balance);
};

export const getTransactionByIdController = async (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.params;

  const transaction = await getTransactionById(id, userId);

  if (!transaction) {
    next(createHttpError(404, `Transaction with id=${id} not found`));
    return;
  }

  res.json(transaction);
};

export const addTransactionController = async (req, res) => {
  const userId = req.user._id;
  const transaction = await addTransaction(req.body, userId);
  res.status(201).json(transaction);
};

export const patchTransactionController = async (req, res, next) => {
  const userId = req.user._id;
  const { transactionId } = req.params;

  const currentTransaction = await updateTransaction(transactionId, userId, {
    ...req.body,
  });

  if (!currentTransaction) {
    next(
      createHttpError(404, `Transaction with id=${transactionId} not found`),
    );
    return;
  }
  const updatedUser = await UsersCollection.findById(userId);
  const updatedBalance = updatedUser ? updatedUser.balance : req.user.balance;

  res.status(200).json({
    status: 200,
    message: `Successfully updated transaction with id = ${transactionId} !`,
    data: currentTransaction,
    balance: updatedBalance,
  });
};

export const deleteTransactionController = async (req, res, next) => {
  const userId = req.user._id;
  const { transactionId } = req.params;

  const transaction = await deleteTransaction(transactionId, userId);

  if (!transaction) {
    next(
      createHttpError(404, `Transaction with id=${transactionId} not found`),
    );
    return;
  }

  res.status(204).send();
};
