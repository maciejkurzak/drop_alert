import Canvas from 'canvas';
import canvasPkg from 'canvas';
import { debug } from 'console';
const { registerFont, createCanvas } = canvasPkg;

import { months } from '../config/config.js';

// import { configProps } from '../config/config';

export const generateImages = async (config: any) => {
  // creating canva
  const canvas = Canvas.createCanvas(1080, 1080);
  const context = canvas.getContext('2d');

  // filling background of canva
  context.fillStyle = '#f6f6f6';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // adding shoes image
  const background = await Canvas.loadImage(process.cwd() + '/src/assets/img/buty.jpg');
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

  context.rotate((-90 * Math.PI) / 180);
  context.font = '64px Rubik SemiBold';
  context.fillStyle = '#00000019';
  context.textAlign = 'center';
  context.fillText('drop_alert', -540, 1050);

  context.rotate((90 * Math.PI) / 180);

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
  context.fillText(`${config.resellPrice} PLN`, canvas.width - 30, canvas.height - 70);

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

  // canvas clipping function
  const canvasRadius = (x: number, y: number, width: number, height: number, radius: number) => {
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
  };

  // ADDING IMAGE COUNTER

  // current image number
  context.font = '36px Rubik Medium';
  context.fillStyle = '#000000';
  context.textAlign = 'left';
  context.fillText(config.currentImage.toString(), 815, 60);

  // images counter
  context.font = '24px Rubik';
  context.fillStyle = '#00000080';
  context.textAlign = 'left';
  context.fillText('/' + config.imagesNumber.toString(), 835, 58);

  // clipping canva
  context.beginPath();
  canvasRadius(30, 30, 100, 100, 18);
  canvasRadius(canvas.width - 30 - 240, 70, 240, 10, 6);
  context.closePath();
  context.clip();

  // app logo
  const appLogo = await Canvas.loadImage(process.cwd() + `/src/assets/img/apps_icons/${config.app}.png`);
  context.drawImage(
    appLogo,
    30, // y
    30, // x
    100, // w
    100 // h
  );

  // image counter bar background
  context.fillStyle = '#00000040';
  context.fillRect(canvas.width - 30 - 240, 70, 240, 10);

  // clipping canva
  context.beginPath();
  canvasRadius(
    canvas.width - 30 - 240 + (240 / config.imagesNumber) * (config.currentImage - 1),
    70,
    240 / config.imagesNumber,
    10,
    6
  );
  context.closePath();
  context.clip();

  // image counter bar value
  context.fillStyle = '#000000';
  context.fillRect(
    canvas.width - 30 - 240 + (240 / config.imagesNumber) * (config.currentImage - 1),
    70,
    240 / config.imagesNumber,
    10
  );

  return canvas;
};
