import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../decorator/roles/roles.decorator';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwt: JwtService) {}

  async getToken() {
    try {
      const token = await this.jwt.signAsync({
        name: 'John Doe',
        role: Role.USER,
      });
      return token;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Internal server error`);
    }
  }

  async verifyToken(token: string, roles?: Role[]): Promise<boolean> {
    try {
      console.log(token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const verify = await this.jwt.verifyAsync(token);
      if (verify) {
        if (roles) {
          if (!roles.includes(verify?.role)) {
            throw new ForbiddenException('you have no permissions');
          }
        }
        return true;
      } else return false;
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.expiredAt) throw new UnauthorizedException('Token expired');
      if (error instanceof HttpException) throw error;
      throw new UnauthorizedException();
    }
  }
}
