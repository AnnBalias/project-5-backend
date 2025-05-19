import Category from '../db/models/categories.js';

export const getCategories = async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    status: 200,
    message: 'Successfully found all categories!',
    data: categories,
  });
};
