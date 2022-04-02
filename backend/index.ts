// IMPORTS
import express from 'express';

import Canvas from 'canvas';
import canvasPkg from 'canvas';
const { registerFont, createCanvas } = canvasPkg;

import fs from 'fs';

import path from 'path';

import chalk from 'chalk';
import {
  createTextChangeRange,
  NumberLiteralType,
  StringLiteralLike,
} from 'typescript';

// ===================================================

// CHALK

const initMsg = (msg: string) => console.log(chalk.bold.blueBright(msg));
const debug = (msg: string) => console.log(chalk.greenBright(msg));
const error = (msg: string) => console.log(chalk.bold.red(msg));
const warning = (msg: string) => console.log(chalk.hex('#FFA500')(msg));

// ===================================================

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

// creating canva
const canvas = Canvas.createCanvas(1080, 1080);
const context = canvas.getContext('2d');

// filling background of canva
context.fillStyle = '#f6f6f6';
context.fillRect(0, 0, canvas.width, canvas.height);

// adding shoes image
const background = await Canvas.loadImage('./assets/img/buty.jpg');
const aspectRatio = background.naturalWidth / background.naturalHeight;

context.drawImage(
  background,
  (canvas.height - canvas.height * aspectRatio) / 2, // y
  0 - (canvas.height / 100) * 15, // x
  canvas.width * aspectRatio, // w
  canvas.height // h
);
// addColorStop(offset: number, color: string): void;

// const gradient = context.createLinearGradient(0, 0, 0, canvas.height);

// gradient.addColorStop(0, '#00000000');
// gradient.addColorStop(0.5, '#00000000');
// gradient.addColorStop(1, '#000000CC');

// context.fillStyle = gradient;
// context.fillRect(0, 0, canvas.width, canvas.height);

// ADDING TEXT

const dropApps: string[] = ['adidas CONFIRMED', 'Nike SNKRS', 'Nike'];
interface configProps {
  shoeModel: string;
  shoeColor: string;
  retailPrice: string;
  resellPrice?: string;
  dateTime: dateTimeProps;
  dropType: 'LEO' | 'DAN' | null;
  app: 'adidas CONFIRMED' | 'Nike SNKRS' | 'Nike';
}

interface dateTimeProps {
  day: number;
  month: number;
  year: number;
  time: string;
}

const months: string[] = [
  'stycznia',
  'lutego',
  'marca',
  'kwietnia',
  'maja',
  'czerwca',
  'lipca',
  'sierpnia',
  'września',
  'października',
  'listopada',
  'grudnia',
];

const config: configProps = {
  shoeModel: 'SB Dunk High Pro',
  shoeColor: 'Mineral Slate Suede',
  retailPrice: '549',
  resellPrice: '700 - 800',
  dateTime: {
    day: 10,
    month: 5,
    year: 2022,
    time: '10:00',
  },
  dropType: 'LEO',
  app: 'Nike SNKRS',
};

// retail text
context.font = '32px Rubik Light';
context.fillStyle = '#00000080';
context.textAlign = 'left';
context.fillText('RETAIL', 30, canvas.height - 30);

// resell text
context.font = '32px Rubik Light';
context.fillStyle = '#00000080';
context.textAlign = 'right';
context.fillText('RESELL', canvas.width - 30, canvas.height - 30);

// retail price
context.font = '58px Rubik Medium';
context.fillStyle = '#000000';
context.textAlign = 'left';
context.fillText(`${config.retailPrice} PLN`, 30, canvas.height - 70);

// resell price
context.font = '58px Rubik Medium';
context.fillStyle = '#000000';
context.textAlign = 'right';
context.fillText(
  `${config.resellPrice} PLN`,
  canvas.width - 30,
  canvas.height - 70
);

// model name
context.font = '72px Rubik SemiBold';
context.fillStyle = '#000000';
context.textAlign = 'left';
context.fillText(config.shoeModel, 30, canvas.height - 270);

// shoe color
context.font = '48px Rubik Light';
context.fillStyle = '#00000080';
context.textAlign = 'left';
context.fillText(config.shoeColor, 30, canvas.height - 210);

// ADDING DROP DATE ANT TYPE

const day = config.dateTime.day.toString();
const month = months[config.dateTime.month - 1];
const year = config.dateTime.year.toString();

context.font = '40px Rubik Medium';
context.fillStyle = '#000000';
context.textAlign = 'left';

context.fillText(`${day} ${month} ${year}`, 150, 70);

context.font = '32px Rubik Light';
context.fillStyle = '#000000';
context.textAlign = 'left';

const hour = config.dateTime.time;

context.fillText(`${hour} (${config.dropType})`, 150, 120);

// ADDING APP LOGO

const appLogo = await Canvas.loadImage(
  `./assets/img/apps_icons/${config.app}.png`
);

const canvasRadius = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
};

canvasRadius(30, 30, 100, 100, 18);
context.clip();

context.drawImage(
  appLogo,
  30, // y
  30, // x
  100, // w
  100 // h
);

// ===================================================

// SAVING IMAGE

// console.log(canvas.toDataURL('image/jpeg').substring(0, 100));

const data = canvas.toBuffer('image/png');

fs.writeFileSync(`./output/image.png`, data);

// ===================================================

// SERVING EXPRESS BACKEND

app.listen(port, () => {
  initMsg('\n');
  initMsg(`╔═════════════════════════════╗`);
  initMsg(`║                             ║`);
  initMsg(`║     GIGA APKA DO DROPÓW     ║`);
  initMsg(`║    http://localhost:${port}/   ║`);
  initMsg(`║                             ║`);
  initMsg(`╚═════════════════════════════╝`);
});
