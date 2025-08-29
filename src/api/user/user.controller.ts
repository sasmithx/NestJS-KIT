import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Post()                                                      // Endpoint to verify JWT token (Working)
  // @HttpCode(HttpStatus.OK)
  // verify(@Body() token: { token: string }) {
  //   return this.userService.verifyToken(token.token);
  // }

  @Post('verifyToken')
  @HttpCode(HttpStatus.OK)
  verify(@Body('token') token: string) {
    return this.userService.verifyToken(token);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginuserData: { username: string; password: string }) {
    return this.userService.login(loginuserData);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
