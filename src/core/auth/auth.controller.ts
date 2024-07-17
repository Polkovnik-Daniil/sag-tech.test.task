import { Controller, Post, Body, Res } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  //+
  @Post('/register')
  async Register(@Body() userData: Prisma.UserCreateInput): Promise<null> {
    await this.service.createUser(userData);
    return;
  }
  //+
  @Post('/login')
  async Login(
    @Body() userData: { email: string; password: string },
  ): Promise<string> {
    return this.service.login(userData);
  }
}
