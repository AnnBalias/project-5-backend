// сервіси для роботи з транзакціями
import { TransactionsCollection } from '../db/models/transaction.js';

export const getAllTransactions = async (userId) => {
  const result = await TransactionsCollection.find({ userId })
    .sort({ date: -1, createdAt: -1 });
  return result;
};

export const getTransactionById = async (transactionId, userId) => {
  const result = await TransactionsCollection.findOne({
    _id: transactionId,
    userId
  });
  return result;
};

export const addTransaction = async (transactionData, userId) => {
  const result = await TransactionsCollection.create({
    ...transactionData,
    userId
  });
  return result;
};

export const updateTransaction = async (transactionId, updateData) => {
  const result = await TransactionsCollection.findByIdAndUpdate(
    transactionId,
    updateData,
    { new: true }
  );
  return result;
};

export const deleteTransaction = async (transactionId, userId) => {
  const result = await TransactionsCollection.findOneAndDelete({
    _id: transactionId,
    userId,
  });
  return result;
};