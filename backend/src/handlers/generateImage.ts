import Canvas from 'canvas';
import canvasPkg from 'canvas';
import { debug } from 'console';
const { registerFont, createCanvas } = canvasPkg;

import { months } from '../config/configProps.js';

export const generateImage = async (data: any, imagePath: string, number: number) => {
  // creating canva
  const canvas = Canvas.createCanvas(1080, 1080);
  const context = canvas.getContext('2d');

  // filling background of canva
  context.fillStyle = '#f6f6f6';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // adding shoes image
  const background = await Canvas.loadImage(imagePath);
  const aspectRatio = background.naturalWidth / background.naturalHeight;

  console.log(number);

  if (number == 1) {
    context.drawImage(
      background,
      (canvas.height - canvas.height * aspectRatio) / 2, // y
      0, // x
      canvas.width * aspectRatio, // w
      canvas.height // h
    );
  } else {
    context.drawImage(
      background,
      (canvas.height - canvas.height * aspectRatio) / 2, // y
      0, // x
      canvas.width * aspectRatio, // w
      canvas.height // h
    );
  }

  // ADDING TEXT
  const kernedText = (text: string) => {
    const kernedText = text.split('').join(String.fromCharCode(0x200a));
    return kernedText;
  };

  context.rotate((-90 * Math.PI) / 180);
  context.font = '48px Rubik';
  context.fillStyle = '#00000040';
  context.textAlign = 'center';
  context.fillText(kernedText('@drop_alert'), -540, 1060);

  context.rotate((90 * Math.PI) / 180);

  if (number == 1) {
    // retail text
    context.font = '32px Rubik Light';
    context.fillStyle = '#00000080';
    context.textAlign = 'left';
    context.fillText(kernedText('RETAIL'), 30, canvas.height - 30);

    // resell text
    context.font = '32px Rubik Light';
    context.fillStyle = '#00000080';
    context.textAlign = 'right';
    context.fillText(kernedText('RESELL'), canvas.width - 30, canvas.height - 30);

    // retail price
    context.font = '58px Rubik SemiBold';
    context.fillStyle = '#000000';
    context.textAlign = 'left';
    context.fillText(kernedText(`${data.retailPrice} PLN`), 30, canvas.height - 70);

    // resell price
    context.font = '58px Rubik SemiBold';
    context.fillStyle = '#000000';
    context.textAlign = 'right';
    context.fillText(kernedText(`${data.resellPrice} PLN`), canvas.width - 30, canvas.height - 70);

    // model name
    context.font = '72px Rubik SemiBold';
    context.fillStyle = '#000000';
    context.textAlign = 'left';
    context.fillText(kernedText(data.shoeModel), 30, canvas.height - 270);

    // shoe color
    context.font = '48px Rubik Light';
    context.fillStyle = '#00000080';
    context.textAlign = 'left';
    context.fillText(kernedText(data.shoeColor), 30, canvas.height - 210);

    // ADDING DROP DATE ANT TYPE

    // const day = data.dateTime.day.toString();
    // const month = months[data.dateTime.month - 1];
    // const year = data.dateTime.year.toString();

    context.font = '40px Rubik Medium';
    context.fillStyle = '#000000';
    context.textAlign = 'left';

    // context.fillText(kernedText(`${day} ${month} ${year}`), 150, 70);

    context.font = '32px Rubik Light';
    context.fillStyle = '#000000';
    context.textAlign = 'left';

    // const hour = data.dateTime.time;

    // context.fillText(kernedText(`${hour} ${data.dropType ? '(' + data.dropType + ')' : ''}`), 150, 120);
  }

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
  context.fillText(kernedText(number.toString()), 815, 60);

  // images counter
  context.font = '24px Rubik';
  context.fillStyle = '#00000080';
  context.textAlign = 'left';
  context.fillText(kernedText('/' + data.imagesCount.toString()), 835, 58);

  // clipping canva
  context.beginPath();
  canvasRadius(30, 30, 100, 100, 18);
  canvasRadius(canvas.width - 30 - 240, 70, 240, 10, 6);
  context.closePath();
  context.clip();

  if (number == 1) {
    // app logo
    const appLogo = await Canvas.loadImage(process.cwd() + `/src/assets/img/apps_icons/${data.app}.png`);
    context.drawImage(
      appLogo,
      30, // y
      30, // x
      100, // w
      100 // h
    );
  }

  // image counter bar background
  context.fillStyle = '#00000040';
  context.fillRect(canvas.width - 30 - 240, 70, 240, 10);

  // clipping canva
  context.beginPath();
  canvasRadius(canvas.width - 30 - 240 + (240 / data.imagesCount) * (number - 1), 70, 240 / data.imagesCount, 10, 6);
  context.closePath();
  context.clip();

  // image counter bar value
  context.fillStyle = '#000000';
  context.fillRect(canvas.width - 30 - 240 + (240 / data.imagesCount) * (number - 1), 70, 240 / data.imagesCount, 10);

  return canvas;
};
