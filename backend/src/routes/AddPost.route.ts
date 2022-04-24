import express from 'express';
import fs from 'fs';

import { config } from '../config/config.js';
import { generateImage } from '../handlers/generateImage.js';
import { getImageData, saveImage } from '../handlers/saveImage.js';
const router = express.Router();

import { PostSchema, PostModel } from '../models/Post.model.js';
import { loggedUsers } from './Auth.route.js';

router.post('/', async (req, res) => {
  console.log(req.body.files);

  try {
    if (loggedUsers.find((user: any) => user.token === req.body.token)) {
      // console.log('User is logged in');
      return res.send({ isTokenValid: true, status: 'success' });
    } else {
      // console.log('User is not logged in');
      return res.send({ isTokenValid: false });
    }
    // const images = [];

    // for (let i = 0; i < config.imagesNumber; i++) {
    //   const image = await generateImage(config, i + 1);
    //   const imageData = getImageData(image, i + 1);
    //   images.push(imageData);
    // }

    // const post = new PostModel({
    //   imagesNumber: req.body.imagesNumber,
    //   shoeModel: req.body.shoeModel,
    //   shoeColor: req.body.shoeColor,
    //   retailPrice: req.body.retailPrice,
    //   resellPrice: req.body.resellPrice,
    //   dateTime: req.body.dateTime,
    //   dropType: req.body.dropType,
    //   app: req.body.app,
    //   images: images,
    // });

    // await post.save();
  } catch (err: any) {
    console.error(err.message);
  }
});

export { router as addPostRoute };
