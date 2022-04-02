// IMPORTS

import express from 'express';

import Canvas from 'canvas';
import canvasPkg from 'canvas';
const { registerFont, createCanvas } = canvasPkg;

import path from 'path';

import { initMsg, debug, error, warning } from './src/handlers/chalkFunctions.js';

import { createTextChangeRange, NumberLiteralType, StringLiteralLike } from 'typescript';

import { config } from './src/config/config.js';
import { generateImages } from './src/handlers/generateImage.js';

// CANVAS FONTS

registerFont(path.resolve('./assets/fonts/Rubik/Rubik-VariableFont_wght.ttf'), {
  family: 'Rubik',
});

// ===================================================

// EXPRESS

// Initialize the express engine
const app: express.Application = express();
// Take a port 3000 for running server.
const port: number = 5100;
// Handling '/' Request
app.get('/', (req, res) => {
  res.send('TypeScript With Expresss');
});

// ===================================================

// GENERATING IMAGE

generateImages(config);

// ===================================================

// SAVING IMAGE

// ===================================================

// SERVING EXPRESS BACKEND

app.listen(port, () => {
  initMsg('\n');
  initMsg(`╔════════════════════════════════╗`);
  initMsg(`║                                ║`);
  initMsg(`║           drop_alert           ║`);
  initMsg(`║     http://localhost:${port}/     ║`);
  initMsg(`║                                ║`);
  initMsg(`╚════════════════════════════════╝`);
});
