import express from 'express';
import fs from 'fs';

import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

import { __dirname } from '../index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.mimetype.slice(6)); //Appending .jpg
  },
});
const upload = multer({ dest: 'public/uploads/', limits: { fileSize: 1000000 }, storage: storage });

import { config } from '../config/config.js';
import { configProps } from '../config/configProps.js';
import { generateImage } from '../handlers/generateImage.js';
import { getImageData, saveImage } from '../handlers/saveImage.js';
import { PostModel } from '../models/Post.model.js';
import { error } from '../handlers/chalkFunctions.js';
import { jwtAuth } from '../middlewares/auth.js';
const router = express.Router();

router.post('/', jwtAuth, upload.array('images', 10), async (req, res) => {
  const data: configProps = req.body;

  try {
    if (req.files) {
      const files = JSON.parse(JSON.stringify(req.files));

      let number = 0;
      let filenames: string[] = [];
      await files.map(async (file: { path: string; filename: string }) => {
        filenames.push(file.path.slice(15));
        number += 1;
        const image = await generateImage(data, path.join(__dirname, '../', file.path), number);
        saveImage(image, path.join(__dirname, '../public/output', file.path.slice(15)));
        // saveImage(image, file.path.split('.')[0]);
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
        images: filenames,
      });

      await post.save();
    }

    res.sendStatus(200);
  } catch (err: any) {
    console.error(err.message);
  }
});

export { router as addPostRoute };
