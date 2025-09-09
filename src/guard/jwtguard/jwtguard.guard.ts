import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthService } from '../../config/jwt/jwt.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_DEC_KEY } from '../../decorator/public/public.decorator';
import { Role, ROLE_DEC_KEY } from '../../decorator/roles/roles.decorator';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtAuthService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_DEC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const roles = this.reflector.getAllAndOverride<Role[]>(ROLE_DEC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req: Request = context.switchToHttp().getRequest();
    const tokenstring = req.headers.authorization;
    console.log(tokenstring);
    const token = tokenstring?.split(' ')[1];
    if (!token) {
      return false;
    }
    return await this.jwtService.verifyToken(token, roles);
  }
}
