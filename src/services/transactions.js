// сервіси для роботи з транзакціями
import { TransactionsCollection } from '../db/models/transaction.js';

export const deleteTransaction = async (transactionId, userId) => {
  const transaction = await TransactionsCollection.findOneAndDelete({
    _id: transactionId,
    userId,
  });

  return transaction;
};
