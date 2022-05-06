import passport from 'passport';
import passportJWT from 'passport-jwt';
import { UserModel } from '../models/User.model.js';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

function verifyCallback(payload: any, done: any) {
  return UserModel.findOne({ _id: payload.id })
    .then((user: any) => {
      return done(null, user);
    })
    .catch((err: any) => {
      return done(err);
    });
}

export default () => {
  const config = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };
  passport.use(UserModel.createStrategy());
  passport.use(new JWTStrategy(config, verifyCallback));
};
