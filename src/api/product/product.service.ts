import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';

export interface Iproduct {
  title: string;
  price: number;
  description: string;
  image: string;
}

@Injectable()
export class ProductService {
  private products: Iproduct[] = [];

  constructor(private readonly DB: PrismaService) {}

  async getAllProducts() {
    try {
      return await this.DB.product.findMany({
        select: {
          title: true,
          price: true,
          description: true,
          image: true,
        },
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Products not found');
    }
  }

  async createProduct(product: Iproduct) {
    try {
      const newdata = await this.DB.product.create({
        data: product,
      });
      return newdata;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Product not created');
    }
  }
}
