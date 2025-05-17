import createHttpError from 'http-errors';
import { 
  getAllTransactions, 
  getTransactionById, 
  addTransaction,
  deleteTransaction 
} from '../services/transactions.js';

export const getTransactionController = async (req, res) => {
  const userId = req.user._id;
  const transactions = await getAllTransactions(userId);
  res.json(transactions);
};

export const getTransactionByIdController = async (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.params;
  
  const transaction = await getTransactionById(id, userId);
  
  if (!transaction) {
    next(createHttpError(404, `Transaction with id=${id} not found`));
    return;
  }
  
  res.json(transaction);
};

export const addTransactionController = async (req, res) => {
  const userId = req.user._id;
  const transaction = await addTransaction(req.body, userId);
  res.status(201).json(transaction);
};

export const deleteTransactionController = async (req, res, next) => {
  const userId = req.user._id;
  const { transactionId } = req.params;
  
  const transaction = await deleteTransaction(transactionId, userId);

  if (!transaction) {
    next(createHttpError(404, `Transaction with id=${transactionId} not found`));
    return;
  }
  
  res.status(204).send();
};