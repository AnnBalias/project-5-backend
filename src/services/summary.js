import { TransactionsCollection } from '../db/models/transaction.js';

export const getSummaryByPeriodService = async (userId, period) => {
  if (!period || !/^\d{4}-\d{2}$/.test(period)) {
    throw new Error('Invalid or missing period. Use format YYYY-MM.');
  }

  const [year, month] = period.split('-');
  const startDate = new Date(`${year}-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  const summary = await TransactionsCollection.aggregate([
    {
      $match: {
        userId: userId,
        date: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: {
          type: '$type',
          category: '$category',
        },
        totalAmount: { $sum: '$amount' },
      },
    },
  ]);

  const incomeByCategory = {};
  const expenseByCategory = {};
  let totalIncome = 0;
  let totalExpense = 0;

  summary.forEach((item) => {
    const { type, category } = item._id;
    const amount = item.totalAmount;

    if (type === 'income') {
      incomeByCategory[category] = amount;
      totalIncome += amount;
    } else if (type === 'expense') {
      expenseByCategory[category] = amount;
      totalExpense += amount;
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
