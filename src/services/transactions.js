// сервіси для роботи з транзакціями
import { TransactionsCollection } from '../db/models/transaction.js';


export const getAllTransactions = async (userId) => {
  const transactions = await TransactionsCollection.find({ userId })
    .sort({ date: -1, createdAt: -1 });
  return transactions;
};

export const getTransactionById = async (transactionId, userId) => {
  const transaction = await TransactionsCollection.findOne({
    _id: transactionId,
    userId
  });
  return transaction;
};

export const addTransaction = async (transactionData, userId) => {
  const transaction = await TransactionsCollection.create({
    ...transactionData,
    userId
  });
};

export const updateTransaction = async (
  transactionId,
  // userId,
  payload,
) => {
  const transaction = await TransactionsCollection.findOneAndUpdate(
    {
      _id: transactionId,
      // userId
    },
    payload,
    {
      new: true,
    },
  );

  return transaction;
};

export const deleteTransaction = async (transactionId, userId) => {
  const transaction = await TransactionsCollection.findOneAndDelete({
    _id: transactionId,
    userId,
  });
  return transaction;
};
