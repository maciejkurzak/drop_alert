import mongoose from 'mongoose';
import { databasePostProps } from '../config/configProps';

const { Schema, model, connect } = mongoose;

const PostSchema = new Schema<databasePostProps>({
  shoeModel: {
    type: String,
    required: true,
  },
  shoeColor: {
    type: String,
    required: true,
  },
  retailPrice: {
    type: String,
    required: true,
    min: 1,
  },
  resellPrice: {
    type: String,
    required: false,
    min: 1,
  },
  dateTime: {
    type: {
      day: Number,
      month: Number,
      year: Number,
      time: String,
    },
    required: true,
  },
  dropType: {
    type: String,
    enum: ['LEO', 'DAN', null],
  },
  app: {
    type: String,
    enum: ['adidas CONFIRMED', 'Nike SNKRS', 'Nike'],
  },
  images: [
    {
      type: Buffer,
      required: true,
    },
  ],
});

const PostModel = model<databasePostProps>('Post', PostSchema);

export { PostSchema, PostModel };