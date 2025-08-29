import { Module } from '@nestjs/common';
import { ProductModule } from './api/product/product.module';
import { UserModule } from './api/user/user.module';
import { JwtAuthModule } from './config/jwt/jwt.module';

@Module({
  imports: [ProductModule, UserModule, JwtAuthModule],
})
export class AppModule {}
