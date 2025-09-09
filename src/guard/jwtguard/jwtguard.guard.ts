import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthService } from '../../config/jwt/jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtAuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const tokenstring = req.headers.authorization;
    console.log(tokenstring);
    const token = tokenstring?.split(' ')[1];
    if (!token) {
      return false;
    }
    return await this.jwtService.verifyToken(token);
  }
}
