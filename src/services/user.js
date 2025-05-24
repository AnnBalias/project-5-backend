import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const getUserById = async (id) => {
  const user = await UsersCollection.findById(id);
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  return user;
};

export const updateUser = async (userId, payload) => {
  const photo = payload.photo;
  const data = payload.data;

  console.log('data:', data);

  const user = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    { photo, ...data },
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!user || !user.value) return null;

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  return {
    data: user.value,
  };
};
