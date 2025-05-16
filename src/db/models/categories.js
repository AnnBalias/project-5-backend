import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
});

export default mongoose.model('Category', categorySchema);
