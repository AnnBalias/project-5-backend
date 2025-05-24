import createHttpError from 'http-errors';
import { getUserById, updateUser } from '../services/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

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

export const patchUserController = async (req, res, next) => {
  const userId = req.user._id;
  const userData = req.body;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const userUbd = {
    data: userData,
    photo: photoUrl,
  };

  const { data } = await updateUser(userId, userUbd);

  if (!data) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully update user with id=${userId}`,
    data: data,
  });
};
