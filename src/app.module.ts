import { Module } from '@nestjs/common';
import { ProductModule } from './api/product/product.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [ProductModule, UserModule],
})
export class AppModule {}
