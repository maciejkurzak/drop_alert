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
import { generateImage } from '../handlers/generateImage.js';
import { getImageData, saveImage } from '../handlers/saveImage.js';
const router = express.Router();

router.post('/', upload.array('images', 3), async (req, res) => {
  console.log(req.files);

  if (req.file) {
    const imagePath = req.file.path;
  }

  res.sendStatus(200);

  try {
  } catch (err: any) {
    console.error(err.message);
  }
});

export { router as SendImageRoute };
