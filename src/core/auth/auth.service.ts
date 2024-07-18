import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UserRepository } from '../user/repository/user.repository';
import bcrypt, { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(data: {
    email: string;
    password: string;
  }): Promise<string | null> {
    const user = await this.validateUser(data);
    //вернуть токен
    return await this.generateToken(user);
  }

  async createUser(data: Prisma.UserCreateInput): Promise<string | null> {
    //hashing password
    const isExists = await this.repository.isExists(data.email);
    if (isExists) {
      return null;
    }
    const saltOrRounds = 10;
    data.password = await hash(data.password, saltOrRounds);
    const user = await this.repository.createUser(data);
    return await this.generateToken(user);
  }

  private async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }

  private async validateUser(data: { email: string; password: string }) {
    const user = await this.repository.findUserByEmail(data.email);
    if (!user) {
      throw new Error('User is not register');
    }
    const passwordEquals = await compare(data.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Invalid password or email' });
  }
}
