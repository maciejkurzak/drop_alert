import express from 'express';
import { PostModel, PostSchema } from '../models/Post.model.js';
// import { loggedUsers } from './Auth.route.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // if (loggedUsers.find((user: any) => user.token === req.body.token)) {
    //   // console.log('User is logged in');
    //   return res.send({ isTokenValid: true, posts: await PostModel.find({}) });
    // } else {
    //   // console.log('User is not logged in');
    //   return res.send({ isTokenValid: false });
    // }
  } catch (err: any) {
    console.error(err.message);
  }
});

export { router as postsRoute };
