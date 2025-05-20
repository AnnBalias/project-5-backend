import mongoose from 'mongoose';
import { TransactionsCollection } from '../db/models/transaction.js';

export const getSummaryByPeriodService = async (userId, period) => {
  if (!period || !/^\d{4}-\d{2}$/.test(period)) {
    throw new Error('Invalid or missing period. Use format YYYY-MM.');
  }

  const [year, month] = period.split('-');
  const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  const objectUserId =
    typeof userId === 'string'
      ? new mongoose.Types.ObjectId(userId)
      : mongoose.Types.ObjectId.createFromTime(userId);

  const summary = await TransactionsCollection.aggregate([
    {
      $match: {
        userId: objectUserId,
        date: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: {
          type: '$type',
          category: '$category',
        },
        totalAmount: { $sum: '$sum' },
      },
    },
  ]);

  const incomeByCategory = {};
  const expenseByCategory = {};
  let totalIncome = 0;
  let totalExpense = 0;

  summary.forEach(({ _id: { type, category }, totalAmount }) => {
    if (type === '+') {
      incomeByCategory[category] = totalAmount;
      totalIncome += totalAmount;
    } else if (type === '-') {
      expenseByCategory[category] = totalAmount;
      totalExpense += totalAmount;
    }
  });

  return {
    period,
    income: {
      total: totalIncome,
      byCategory: incomeByCategory,
    },
    expense: {
      total: totalExpense,
      byCategory: expenseByCategory,
    },
  };
};
