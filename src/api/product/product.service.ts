import {
  Delete,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { AllProductResponse } from './dto/product-response';
import { ProductData, ProductUpdate } from './dto/product-request';

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
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product as ProductData;
    } catch (e) {
      console.log(e);
      if (e instanceof HttpException) {
        throw e;
      }
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

  async updateProduct(id: number, product: ProductUpdate) {
    try {
      await this.DB.product.update({
        where: { id: +id },
        data: product,
      });
      return `${id} is updated successfully`;
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e['code'] === 'P2025')
        throw new NotFoundException(`Product with ID ${id} not found`);
      throw new InternalServerErrorException(`Internal server error`);
    }
  }

  async deleteProduct(id: number): Promise<string> {
    try {
      const deletedProduct = await this.DB.product.delete({
        where: { id: +id },
      });
      return `${deletedProduct.title} is deleted successfully`;
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e['code'] === 'P2025')
        throw new NotFoundException(`Product with ID ${id} not found`);
      throw new InternalServerErrorException(`Internal server error`);
    }
  }
}
