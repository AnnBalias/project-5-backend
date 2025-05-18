import createHttpError from 'http-errors';
import { 
  getAllTransactions, 
  getTransactionById, 
  addTransaction,
  deleteTransaction,
  updateTransaction
} from '../services/transactions.js';

export const getTransactionController = async (req, res) => {
  const userId = req.user._id;
  const transactions = await getAllTransactions(userId);
  res.json({
    status: 200,
    message: 'Successfully retrieved all transactions',
    data: transactions
  });
};

export const getTransactionByIdController = async (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.params;
  
  try {
    const transaction = await getTransactionById(id, userId);
    
    if (!transaction) {
      next(createHttpError(404, `Transaction with id=${id} not found`));
      return;
    }
    
    res.json({
      status: 200,
      message: 'Successfully retrieved transaction',
      data: transaction
    });
  } catch {
    next(createHttpError(400, 'Invalid transaction ID format'));
    return;
  }
};

export const addTransactionController = async (req, res) => {
  const userId = req.user._id;
  const newTransaction = await addTransaction(req.body, userId);
  res.status(201).json({
    status: 201,
    message: 'Transaction created successfully',
    data: newTransaction
  });
};

export const patchTransactionController = async (req, res, next) => {
  const { transactionId } = req.params;
  const currentTransaction = await updateTransaction(
    transactionId,
    { ...req.body },
  );

  if (!currentTransaction) {
    next(
      createHttpError(404, `Transaction with id=${transactionId} not found`),
    );
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully updated transaction with id = ${transactionId} !`,
    data: currentTransaction,
  });
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