import createHttpError from 'http-errors';
import { deleteTransaction } from '../services/transactions.js';

export const deleteTransactionController = async (req, res, next) => {
  //   const userId = req.user._id;
  const { transactionId } = req.params;
  const transaction = await deleteTransaction(transactionId);
  //   const transaction = await deleteTransaction(transactionId, userId);

  if (!transaction) {
    next(
      createHttpError(404, `Transaction with id=${transactionId} not found`),
    );
    return;
  }
  res.status(204).send();
};
