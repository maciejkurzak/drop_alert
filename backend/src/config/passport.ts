import passport from 'passport';
import { UserModel } from '../models/User.model.js';

export default () => {
  passport.use(UserModel.createStrategy());
};
