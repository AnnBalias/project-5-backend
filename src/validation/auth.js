import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name should have at least 2 characters',
    'string.max': 'Name should have at most 32 characters',
    'any.required': 'Enter name',
  }),
  email: Joi.string().email().max(64).required().messages({
    'string.base': 'Email must be a string',
    'any.required': 'Enter email',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password should have at least 8 characters',
    'any.required': 'Enter password',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().max(64).required().messages({
    'string.base': 'Email must be a string',
    'any.required': 'Enter email',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password should have at least 8 characters',
    'any.required': 'Enter password',
  }),
});
