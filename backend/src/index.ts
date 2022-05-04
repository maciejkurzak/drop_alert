// IMPORTS

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
const router = express.Router();
const app: express.Application = express();

import { fileURLToPath } from 'url';

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

// CONNECTING TO DATABASE

await mongoose
  .connect('mongodb://localhost:27017/drop_alert')
  .then(() => {
    debug('Connection estabislished with MongoDB');
  })
  .catch((error) => console.error(error.message));

dbConn();

// ===================================================

// Configure passport

import passport from './config/passport.js';
passport();

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

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use('/public/output', express.static(path.join(__dirname, '../public/output')));

import { authRoute } from './routes/Auth.route.js';
app.use('/api/auth', authRoute());

import { postsRoute } from './routes/Posts.route.js';
app.use('/api/posts', postsRoute);

import { postRoute } from './routes/Post.route.js';
app.use('/api/post/', postRoute);

import { addPostRoute } from './routes/AddPost.route.js';
app.use('/api/add-post', addPostRoute);

// ===================================================

// SERVING EXPRESS BACKEND

app.listen(port, () => {
  listeningMessage(port);
});
