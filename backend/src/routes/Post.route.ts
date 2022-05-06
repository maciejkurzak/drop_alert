import express from 'express';
import { PostModel, PostSchema } from '../models/Post.model.js';
// import { loggedUsers } from './Auth.route.js';
const router = express.Router();

import { ObjectID } from 'mongodb';
import { jwtAuth } from '../middlewares/auth.js';

router.post('/:id', jwtAuth, async (req, res) => {
  try {
    return res.send({ isTokenValid: true, posts: await PostModel.findOne({ _id: req.params.id }) });
  } catch (err: any) {
    console.error(err.message);
  }
});

export { router as postRoute };
