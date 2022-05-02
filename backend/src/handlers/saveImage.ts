import fs from 'fs';

export const getImageData = (canvas: any, number: number) => {
  const data = canvas.toBuffer('image/png');
  return data;
};

export const saveImage = (canvas: any, path: string) => {
  const data = canvas.toBuffer('image/png');
  fs.writeFileSync(path, data);
};
