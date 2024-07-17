import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    //hashing password
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);
    return this.repository.createUser(data);
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.repository.users({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.repository.user(userWhereUniqueInput);
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.repository.updateUser({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.repository.deleteUser(where);
  }
}
