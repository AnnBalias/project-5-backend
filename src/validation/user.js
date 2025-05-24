import Joi from 'joi';

export const patchUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name should have at least 2 characters',
    'string.max': 'Name should have at most 32 characters',
  }),
  email: Joi.string().email().max(64).messages({
    'string.base': 'Email must be a string',
    'string.max': 'Email should have at most 64 characters',
  }),
});
