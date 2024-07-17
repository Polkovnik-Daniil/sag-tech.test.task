import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guards';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}
  //+
  @Get()
  @Roles('Admin')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  async getUsers(): Promise<UserModel[]> {
    return this.service.users({});
  }
  //+
  @Get('/:id')
  @Roles('Admin,User')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  // @UseGuards(UsersGuard)
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.service.user({ id: id });
  }

  //+
  @Put('/:id')
  @Roles('Admin,User')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  // @UseGuards(UsersGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() user: UserModel,
  ): Promise<UserModel> {
    return this.service.updateUser({
      where: { id: id },
      data: user,
    });
  }
  //+
  @Delete('/:id')
  @Roles('Admin,User')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  // @UseGuards(UsersGuard)
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.service.deleteUser({ id: id });
  }
}
