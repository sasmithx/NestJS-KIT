import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { AllProductResponse, ProductData } from './dto/product-response';

@Injectable()
export class ProductService {
  constructor(private readonly DB: PrismaService) {}

  async getAllProducts(): Promise<AllProductResponse> {
    try {
      const allproducts = await this.DB.product.findMany();
      const newVar = { products: allproducts };
      return newVar;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Products not found');
    }
  }

  async getProductById(id: number): Promise<ProductData> {
    try {
      const product: unknown = await this.DB.product.findUnique({
        where: { id: +id },
        select: {
          title: true,
          price: true,
          description: true,
          image: true,
        },
      });
      return product as ProductData;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Product not found');
    }
  }

  async createProduct(product: ProductData) {
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
