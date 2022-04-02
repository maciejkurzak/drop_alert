// IMPORTS

import express from 'express';

import Canvas from 'canvas';
import canvasPkg from 'canvas';
const { registerFont, createCanvas } = canvasPkg;

import path from 'path';

import figlet from 'figlet';

import { initMsg, debug, error, warning } from './handlers/chalkFunctions.js';

import {
  collapseTextChangeRangesAcrossMultipleVersions,
  createTextChangeRange,
  NumberLiteralType,
  StringLiteralLike,
} from 'typescript';

import { config, months } from './config/config.js';
import { generateImages } from './handlers/generateImage.js';
import { saveImage } from './handlers/saveImage.js';

// CANVAS FONTS

registerFont(path.resolve('./src/assets/fonts/Rubik/Rubik-VariableFont_wght.ttf'), {
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

const image = await generateImages(config);

// ===================================================

// SAVING IMAGE

saveImage(image);

// ===================================================

// SERVING EXPRESS BACKEND

app.listen(port, () => {
  console.log('\n');
  figlet.text(
    'drop_alert',
    {
      // font: 'Dr Pepper',
      font: 'Larry 3D',
      // font: 'Rectangles',
    },
    function (err: any, data: any) {
      console.log(data);
    }
  );
  setTimeout(() => {
    initMsg('\n');
    initMsg(`                ╔════════════════════════════════╗`);
    initMsg(`                ║                                ║`);
    initMsg(`                ║           drop_alert           ║`);
    initMsg(`                ║     http://localhost:${port}/     ║`);
    initMsg(`                ║                                ║`);
    initMsg(`                ╚════════════════════════════════╝`);
    initMsg('\n');
  }, 100);
});
