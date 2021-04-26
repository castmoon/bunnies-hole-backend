import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  mediaType: String,
  value: Number,
  rating: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  createdAt: Date,
});
