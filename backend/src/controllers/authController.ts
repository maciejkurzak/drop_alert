import { UserModel } from '../models/User.model.js';
import jwt from 'jsonwebtoken';

const AuthController = {
  async login(req: any, res: any, next: any) {
    // console.log(req.body);

    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET as any, { expiresIn: 1200 });

    const user = await UserModel.findOne({ username: req.body.username }).select('email username role');
    if (!user) {
      return res.status(400).send({ error: 'Account does not exist with provided username and password combination.' });
    }

    // console.log(user);

    return res.send({ token, user });
  },

  async register(req: { body: { email: any; username: any; password: any } }, res: any, next: any) {
    const { email, username, password } = req.body;
    const user = new UserModel({ email, username });
    await UserModel.register(user, password);

    res.send(200);
  },
};

export { AuthController };
