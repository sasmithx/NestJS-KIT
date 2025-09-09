import { Global, Module } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '../../guard/jwtguard/jwtguard.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: `yourSecretKey`, // Replace with your actual secret key
      signOptions: { expiresIn: '1min' }, // Token expiration time
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtAuthService,
  ],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
