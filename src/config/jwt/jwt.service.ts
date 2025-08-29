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

  async verifyToken(token: string): Promise<boolean> {
    try {
      const verify: unknown = await this.jwt.verifyAsync(token);
      return verify as boolean;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
