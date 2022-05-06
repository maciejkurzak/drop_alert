import passport from 'passport';

export const jwtAuth = (req: any, res: any, next: any) => {
  return passport.authenticate('jwt', { session: false })(req, res, next);
};
