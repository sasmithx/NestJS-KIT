import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwt: JwtService) {}

  async getToken() {
    try {
      const token = await this.jwt.signAsync({
        name: 'John Doe',
      });
      return token;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Internal server error`);
    }
  }

  // @ts-expect-error
  async verifyToken(token: string): Promise<boolean> {
    try {
      console.log(token);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const verify = await this.jwt.verifyAsync(token);
      if (verify) {
        return true;
      }
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.expiredAt) throw new UnauthorizedException('Token expired');
      throw new UnauthorizedException();
    }
  }
}
