import express from 'express';
const router = express.Router();

import bcrypt from 'bcrypt';
const salt = await bcrypt.genSalt(10);

import { UserSchema, UserModel } from '../models/User.model.js';

import { registrationValidator, loginValidator } from '../handlers/validator.js';

router.post('/register', async (req, res) => {
  try {
    // check if email exists
    const emailExists = await UserModel.exists({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists.');

    // check if username exists
    const userNameExists = await UserModel.exists({ username: req.body.username });
    if (userNameExists) return res.status(400).send('Username already exists.');

    const { error } = registrationValidator(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    const savedUser = await user.save();
    // res.send(savedUser);
    res.send('Register Successful!');
  } catch (err: any) {
    console.error(err.message);
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const { error } = loginValidator(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    //UserExistCheck
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user)
      return res.status(400).send({ error: 'Account does not exist with provided username and password combination.' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ error: 'Incorrect Password' });

    res.send({
      token: 'test123',
    });

    console.log(`User ${user.username} logged in.`);

    // res.send('Login Successful!');
  } catch (err: any) {
    console.error(err.message);
  }
});

export { router as authRoute };
