import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductData } from './dto/product-request';
import { JwtGuard } from '../../guard/jwtguard/jwtguard.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @UseGuards(JwtguardGuard)
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

  @Put('update-product/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateproductdata: ProductData,
  ) {
    return this.productService.updateProduct(+id, updateproductdata);
  }

  @Delete('delete-product/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(+id);
  }
}
