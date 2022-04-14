export const dropApps: string[] = ['adidas CONFIRMED', 'Nike SNKRS', 'Nike'];

export interface configProps {
  imagesNumber: number;
  shoeModel: string;
  shoeColor: string;
  retailPrice: string;
  resellPrice?: string;
  dateTime: dateTimeProps;
  dropType: 'LEO' | 'DAN' | null;
  app: 'adidas CONFIRMED' | 'Nike SNKRS' | 'Nike';
}

export interface databasePostProps extends configProps {
  images: Buffer[];
}

export const months: string[] = [
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

interface dateTimeProps {
  day: number;
  month: number;
  year: number;
  time: string;
}
