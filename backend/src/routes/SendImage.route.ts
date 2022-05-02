import express from 'express';
import fs from 'fs';

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.mimetype.slice(6)); //Appending .jpg
  },
});
const upload = multer({ dest: 'uploads/', limits: { fileSize: 1000000 }, storage: storage });

import { config } from '../config/config.js';
import { configProps } from '../config/configProps.js';
import { generateImage } from '../handlers/generateImage.js';
import { getImageData, saveImage } from '../handlers/saveImage.js';
import { PostModel } from '../models/Post.model.js';
const router = express.Router();

router.post('/', upload.array('images', 10), async (req, res) => {
  // console.log(req.files);

  const data: configProps = req.body;

  // console.log(data);

  if (req.files) {
    const files = JSON.parse(JSON.stringify(req.files));

    let number = 0;
    const images: any = [];
    files.map(async (file: { path: string; filename: string }) => {
      setTimeout(async () => {
        number += 1;
        const image = await generateImage(data, `\\` + file.path, number);
        const imageData = getImageData(image, number);
        images.push(imageData);
      }, 1000);
    });

    const post = new PostModel({
      imagesCount: data.imagesCount,
      shoeModel: data.shoeModel,
      shoeColor: data.shoeColor,
      retailPrice: data.retailPrice,
      resellPrice: data.resellPrice,
      dateTime: data.dateTime,
      dropType: data.dropType,
      app: data.app,
      images: images,
    });

    await post.save();
  }

  res.sendStatus(200);

  try {
  } catch (err: any) {
    console.error(err.message);
  }
});

export { router as SendImageRoute };
