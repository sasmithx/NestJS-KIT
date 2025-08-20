import { Product } from '../../../../generated/prisma';

export class AllProductResponse {
  products: Product[];
}

export class ProductData {
  title: string;
  price: number;
  description: string;
  image: string;
}
