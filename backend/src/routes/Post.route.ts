import express from 'express';
import { PostModel, PostSchema } from '../models/Post.model.js';
// import { loggedUsers } from './Auth.route.js';
const router = express.Router();

import { ObjectID } from 'mongodb';
import { jwtAuth } from '../middlewares/auth.js';

router.post('/:id', jwtAuth, async (req, res) => {
  try {
    const post = await PostModel.findOne({ _id: req.params.id });
    return res.send({ post });
  } catch (err: any) {
    return res.status(404).send({ error: 'Post not found' });
    console.error(err.message);
  }
});

router.delete('/:id', jwtAuth, async (req, res) => {
  try {
    const post = await PostModel.deleteOne({ _id: req.params.id });
    return res.send({ post });
  } catch (err: any) {
    console.error(err.message);
  }
});

export { router as postRoute };
