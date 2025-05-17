// сервіси для роботи з транзакціями
import { TransactionsCollection } from '../db/models/transaction.js';

export const updateTransaction = async (transactionId, userId, payload) => {
  const transaction = await TransactionsCollection.findOneAndUpdate(
    { _id: transactionId, userId },
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
