import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductData } from './dto/product-response';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all-products')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('by-id/:id')
  getProductById(@Param('id') id: number) {
    console.log(`Fetching product with ID: ${id}`);
    // return 'hi';
    return this.productService.getProductById(+id);
  }

  @Post('create-product')
  createProduct(@Body() newproductdata: ProductData) {
    console.log('Creating product:', newproductdata);
    return this.productService.createProduct(newproductdata);
  }
}
