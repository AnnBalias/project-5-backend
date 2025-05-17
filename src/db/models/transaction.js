// модель транзакції
import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { typeList } from '../../constants/transactions.js';
import { categoryList } from '../../constants/categories.js';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const transactionSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: typeList,
      default: typeList[1],
    },
    category: {
      type: String,
      required: true,
      enum: categoryList,
      default: categoryList[0],
    },
    comment: {
      type: String,
      default: '',
    },
    sum: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      //   required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

transactionSchema.post('save', handleSaveError);
transactionSchema.pre('findOneAndUpdate', setUpdateSettings);
transactionSchema.post('findOneAndUpdate', handleSaveError);

export const transactionsSortFields = [
  'date',
  'type',
  'category',
  'comment',
  'sum',
];

export const TransactionsCollection = model('transactions', transactionSchema);
