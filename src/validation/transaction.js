// валідація транзакцій ;
import Joi from 'joi';
import { categoryList } from '../constants/categories.js';
import { typeList } from '../constants/transactions.js';

export const patchTransactionSchema = Joi.object({
  date: Joi.date().iso().messages({
    'date.base': 'Invalid date. Use the ISO format (YYYY-MM-DD)',
  }),
  type: Joi.string()
    .valid(...typeList)
    .messages({
      'any.only': 'Transaction type must be one of the allowed values',
    }),
  category: Joi.string()
    .valid(...categoryList)
    .messages({
      'any.only': 'Category must be one of the allowed values',
    }),
  comment: Joi.string().max(60).messages({
    'string.base': 'comment should be a string',
    'string.max': 'Comment no more than 60 characters',
  }),
  sum: Joi.number().positive().messages({
    'number.base': 'Sum must be a number',
    'number.positive': 'Sum must be greater than 0',
  }),
});
