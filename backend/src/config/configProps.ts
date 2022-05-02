export const dropApps: string[] = ['adidas CONFIRMED', 'Nike SNKRS', 'Nike'];

export interface configProps {
  imagesCount: number;
  shoeModel: string;
  shoeColor: string;
  retailPrice: string;
  resellPrice?: string;
  dateTime: string;
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
