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
    cb(null, Date.now() + '.' + file.mimetype.slice(6));
  },
});
const upload = multer({ dest: 'public/uploads/', limits: { fileSize: 1048576 }, storage: storage }).array('images', 10);
import { config } from '../config/config.js';
import { configProps } from '../config/configProps.js';
import { generateImage } from '../handlers/generateImage.js';
import { getImageData, saveImage } from '../handlers/saveImage.js';
import { PostModel } from '../models/Post.model.js';
import { error } from '../handlers/chalkFunctions.js';
import { jwtAuth } from '../middlewares/auth.js';
import { nextTick } from 'process';
const router = express.Router();

interface multerErrorsProps {
  [key: string]: string;
}

const multerErrors: multerErrorsProps = {
  LIMIT_PART_COUNT: 'Too many parts',
  LIMIT_FILE_SIZE: 'File too large',
  LIMIT_FILE_COUNT: 'Too many files',
  LIMIT_FIELD_KEY: 'Field name too long',
  LIMIT_FIELD_VALUE: 'Field value too long',
  LIMIT_FIELD_COUNT: 'Too many fields',
  LIMIT_UNEXPECTED_FILE: 'Unexpected field',
  MISSING_FIELD_NAME: 'Field name missing',
};

router.post(
  '/',
  jwtAuth,
  function (req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ error: multerErrors[err.code] });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(415).json({ error: multerErrors[err.code] });
        } else {
          return res.status(400).json({ error: multerErrors[err.code] });
        }
      } else if (err) {
        return res.status(400).json({ error: 'Unknown error' });
      }
      next();
    });
  },
  async (req: any, res: any) => {
    const data: configProps = req.body;

    console.log(data);

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
  }
);

export { router as addPostRoute };
