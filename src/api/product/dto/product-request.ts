import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from '../../order/dto/create-order.dto';

export class ProductData {
  title: string;
  price: number;
  description: string;
  image: string;
}

export class ProductUpdate extends PartialType(CreateOrderDto) {}
