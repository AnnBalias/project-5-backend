import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const getUserById = async (id) => {
  const user = await UsersCollection.findById(id);
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  return user;
};
