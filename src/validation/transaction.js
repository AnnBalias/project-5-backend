// валідація транзакцій ;
import Joi from 'joi';
import { categoryList } from '../constants/contacts.js';

export const patchTransactionSchema = Joi.object({
  date: Joi.string().messages({
    // 'string.base': 'Name should be a string',
  }),
  type: Joi.string().messages({
    // 'string.base': 'PhoneNumber should be a string',
  }),
  categoryType: Joi.string().valid(...categoryList),
  comment: Joi.string().max(60).messages({
    'string.base': 'comment should be a string',
    'string.max': 'Сomment no more than 60 characters',
  }),
  sum: Joi.number(),
});
