import createHttpError from 'http-errors';
import { getUserById } from '../services/user.js';

export const getUserController = async (req, res) => {
  const userData = req.user;

  const user = await getUserById(userData._id);

  if (!user) {
    throw createHttpError(404, `User with id=${userData._id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found user with id=${userData._id}`,
    data: user,
  });
};
