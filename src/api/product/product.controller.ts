import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import * as productService from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all-products')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('by-id/:id')
  getProductById(@Param('id') productId: number) {
    console.log(`Fetching product with ID: ${productId}`);
    return 'hi';
    // return this.productService.getProductById(productId);
  }

  @Post('create-product')
  createProduct(@Body() newproductdata: productService.Iproduct) {
    console.log('Creating product:', newproductdata);
    return this.productService.createProduct(newproductdata);
  }
}
