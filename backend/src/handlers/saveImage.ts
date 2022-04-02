import fs from 'fs';

export const saveImage = (canvas: any, number: number) => {
  // console.log(canvas.toDataURL('image/jpeg').substring(0, 100));
  const data = canvas.toBuffer('image/png');
  fs.writeFileSync(`./output/${number.toString()}.png`, data);
};
