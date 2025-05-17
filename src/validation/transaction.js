import Joi from 'joi';
import { typeList } from '../constants/transactions.js';
import { categoryList } from '../constants/categories.js';

export const transactionAddSchema = Joi.object({
  type: Joi.string()
    .valid(...typeList)
    .required()
    .messages({
      'any.required': 'Type is required',
      'string.base': 'Type must be a string',
      'any.only': 'Type must be either "+" or "-"'
    }),
  category: Joi.string()
    .valid(...categoryList)
    .required()
    .messages({
      'any.required': 'Category is required',
      'string.base': 'Category must be a string',
      'any.only': 'Category must be one of the predefined categories'
    }),
  sum: Joi.number()
    .min(0.01)
    .max(1000000)
    .required()
    .messages({
      'any.required': 'Sum is required',
      'number.base': 'Sum must be a number',
      'number.min': 'Sum must be greater than 0',
      'number.max': 'Sum cannot exceed 1000000'
    }),
  date: Joi.date()
    .iso()
    .required()
    .messages({
      'any.required': 'Date is required',
      'date.base': 'Date must be a valid date',
      'date.format': 'Date must be in YYYY-MM-DD format'
    }),
  comment: Joi.string()
    .min(2)
    .max(192)
    .allow('')
    .messages({
      'string.base': 'Comment must be a string',
      'string.min': 'Comment must be at least 2 characters long',
      'string.max': 'Comment cannot exceed 192 characters'
    })
});