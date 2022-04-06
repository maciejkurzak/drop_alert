import mongoose from 'mongoose';

const { Schema, model, connect } = mongoose;

interface User {
  email: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
  date: any;
}

const UserSchema = new Schema<User>({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    min: 6,
    max: 15,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
    default: 'user',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  // orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const UserModel = model<User>('User', UserSchema);

export { UserSchema, UserModel };
