import createHttpError from 'http-errors';
import {
  deleteTransaction,
  updateTransaction,
} from '../services/transactions.js';

export const patchTransactionController = async (req, res, next) => {
  const userId = req.user._id;
  const { transactionId } = req.params;
  const data = await updateTransaction(transactionId, userId, {
    ...req.body,
  });

  if (!data) {
    next(
      createHttpError(404, `Transaction with id=${transactionId} not found`),
    );
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully updated transaction with id = ${transactionId} !`,
    data,
  });
};

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
