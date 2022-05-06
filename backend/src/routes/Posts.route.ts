import express from 'express';
import { jwtAuth } from '../middlewares/auth.js';
import { PostModel, PostSchema } from '../models/Post.model.js';
// import { loggedUsers } from './Auth.route.js';
const router = express.Router();

router.post('/', jwtAuth, async (req, res) => {
  try {
    return res.send({ posts: await PostModel.find({}) });
  } catch (err: any) {
    console.error(err.message);
  }
});

export { router as postsRoute };
