export const dropApps: string[] = ['adidas CONFIRMED', 'Nike SNKRS', 'Nike'];

interface configProps {
  currentImage: number;
  imagesNumber: number;
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

export const config: configProps = {
  currentImage: 1,
  imagesNumber: 3,
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