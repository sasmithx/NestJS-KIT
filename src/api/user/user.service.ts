import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../config/prisma/prisma.service';
import { LoginUserData } from './dto/user-request-dto';

@Injectable()
export class UserService {
  constructor(private readonly DB: PrismaService) {}

  async login(userloginData: LoginUserData) {
    try {
      const user = await this.DB.user.findUnique({
        where: { username: userloginData.username },
      });
      if (!user)
        throw new NotFoundException(`${userloginData.username} not found`);
      if (user.password !== userloginData.password)
        throw new BadRequestException(`Invalid credentials`);
      return `${userloginData.username} is successfully logged in`;
    } catch (e) {
      console.log(e);
      if (e instanceof HttpException) throw e;
      throw new InternalServerErrorException(`Internal server error`);
    }
  }

  async create(userData: CreateUserDto) {
    try {
      const newUser = await this.DB.user.create({
        data: userData,
        select: {
          name: true,
          age: true,
          username: true,
          city: true,
          phone: true,
          email: true,
        },
      });
      return newUser;
    } catch (e) {
      console.log(e);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e.code === 'P2002')
        throw new BadRequestException(`${userData.username} is already taken`);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
