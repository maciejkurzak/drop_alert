// IMPORTS

import express from 'express';
const router = express.Router();
const app: express.Application = express();

import cors from 'cors';
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

import mongoose from 'mongoose';

import dbConn from './handlers/initDB.js';
import { debug } from './handlers/chalkFunctions.js';

import { UserSchema, UserModel } from './models/User.model.js';

import canvasPkg from 'canvas';
const { registerFont, createCanvas } = canvasPkg;

import path from 'path';

import { config, port } from './config/config.js';
import { generateImage } from './handlers/generateImage.js';
import { saveImage } from './handlers/saveImage.js';
import listeningMessage from './handlers/listeningMessage.js';

// ===================================================

// CANVAS FONTS

registerFont(path.resolve('./src/assets/fonts/Rubik/Rubik-VariableFont_wght.ttf'), {
  family: 'Rubik',
});

// ===================================================

// EXPRESS

// Initialize the express engine
// Handling '/' Request
app.get('/', (req, res) => {
  res.send('TypeScript With Expresss');
});

import { authRoute } from './routes/Auth.route.js';
app.use('/api/auth', authRoute);

// ===================================================

// GENERATING AND SAVING IMAGES

for (let i = 0; i < config.imagesNumber; i++) {
  const image = await generateImage(config, i + 1);
  saveImage(image, i + 1);
}

// ===================================================

// SERVING EXPRESS BACKEND

app.listen(port, () => {
  listeningMessage(port);
});

// ===================================================

// CONNECTING TO DATABASE

await mongoose
  .connect('mongodb://localhost:27017/drop_alert')
  .then(() => {
    debug('Connection estabislished with MongoDB');
  })
  .catch((error) => console.error(error.message));

dbConn();
