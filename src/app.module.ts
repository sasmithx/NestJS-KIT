import { Module } from '@nestjs/common';
import { ProductModule } from './api/product/product.module';
import { UserModule } from './api/user/user.module';
import { JwtAuthModule } from './config/jwt/jwt.module';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiCacheInterceptor } from './interceptor/api-cache/api-cache.interceptor';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 5,
      max: 100,
    }),
    ProductModule,
    UserModule,
    JwtAuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiCacheInterceptor,
    },
  ],
})
export class AppModule {}
