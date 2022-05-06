import mongoose, { Document, PassportLocalDocument, PassportLocalModel, PassportLocalSchema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const { Schema, model, connect } = mongoose;

interface User extends PassportLocalDocument {
  email: string;
  username: string;
  password: string;
  role: 'user' | 'admin';
  date: any;
}

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      min: 6,
      max: 15,
      trim: true,
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
  },
  {
    timestamps: true,
  }
) as PassportLocalSchema;

interface UserModel<T extends Document> extends PassportLocalModel<T> {}

UserSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

const UserModel: UserModel<User> = model<User>('User', UserSchema);

export { UserSchema, UserModel };
