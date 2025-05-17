import { getSummaryByPeriodService } from '../services/summary.js';

export const getSummary = async (req, res) => {
  try {
    const { period } = req.params;
    const userId = req.user ? req.user.id : 'testUserId';

    const result = await getSummaryByPeriodService(userId, period);
    res.json(result);
  } catch (err) {
    console.error('Error in getSummaryByPeriod:', err.message);
    res.status(400).json({ message: err.message });
  }
};
