// сервіси для роботи з транзакціями
import { TransactionsCollection } from '../db/models/transaction.js';
import { UsersCollection } from '../db/models/user.js';
import { calculateBalanceChange } from '../utils/calculateBalanceChange.js';

export const getAllTransactions = async (userId) => {
  const result = await TransactionsCollection.find({ userId }).sort({
    date: -1,
    createdAt: -1,
  });
  return result;
  const transactions = await TransactionsCollection.find({ userId }).sort({
    date: -1,
    createdAt: -1,
  });

  return transactions;
};

export const getTransactionById = async (transactionId, userId) => {
  const transaction = await TransactionsCollection.findOne({
    _id: transactionId,
    userId,
  const result = await TransactionsCollection.findOne({
    transactionId,
    userId,
  });
  return result;
};

export const addTransaction = async (transactionData, userId) => {
  const result = await TransactionsCollection.create({
    ...transactionData,
    userId,
  
  });
  const balanceChange = calculateBalanceChange(null, transaction);
  await UsersCollection.findByIdAndUpdate(userId, {
    $inc: { balance: balanceChange },
  });
  return result;
};


export const updateTransaction = async (transactionId, userId, payload) => {
  const oldTransaction = await TransactionsCollection.findById(
    transactionId,
  ).lean();

  if (!oldTransaction) {
    return null; // обробіть помилку
  }
  const updateTransaction = await TransactionsCollection.findOneAndUpdate(
    {
      _id: transactionId,
      userId,
    },
    payload,
    {
      new: true,
    },
  );

  if (!updateTransaction) {
    return null; // обробіть помилку
  }
  const balanceChange = calculateBalanceChange(
    oldTransaction,
    updateTransaction,
  );

  await UsersCollection.findByIdAndUpdate(userId, {
    $inc: { balance: balanceChange },
  });
  return updateTransaction;
};

export const deleteTransaction = async (transactionId, userId) => {
  const result = await TransactionsCollection.findOneAndDelete({
    _id: transactionId,
    userId,
  });
  return result;
};
