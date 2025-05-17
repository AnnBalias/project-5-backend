import Transaction from '../models/Transaction.js';

export const getSummaryByPeriod = async (req, res) => {
  try {
    const { period } = req.query;
    const userId = req.user.id;

    if (!period || !/^\d{4}-\d{2}$/.test(period)) {
      return res
        .status(400)
        .json({ message: 'Invalid or missing period. Use format YYYY-MM.' });
    }

    const [year, month] = period.split('-');
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const summary = await Transaction.aggregate([
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

    res.json({
      period,
      income: {
        total: totalIncome,
        byCategory: incomeByCategory,
      },
      expense: {
        total: totalExpense,
        byCategory: expenseByCategory,
      },
    });
  } catch (err) {
    console.error('Error in getSummaryByPeriod:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
