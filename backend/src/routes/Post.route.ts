import express from 'express';
import { PostModel, PostSchema } from '../models/Post.model.js';
// import { loggedUsers } from './Auth.route.js';
const router = express.Router();

import { ObjectID } from 'mongodb';

router.post('/:id', async (req, res) => {
  try {
    // if (loggedUsers.find((user: any) => user.token === req.body.token)) {
    //   // console.log('User is logged in');
    //   return res.send({ isTokenValid: true, posts: await PostModel.findOne({ _id: req.params.id }) });
    //   console.log('Request Id:', req.params);
    // } else {
    //   // console.log('User is not logged in');
    //   return res.send({ isTokenValid: false });
    // }
  } catch (err: any) {
    console.error(err.message);
  }
});

export { router as postRoute };
