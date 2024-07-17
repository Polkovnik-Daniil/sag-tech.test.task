import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma.module';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.secret_key || 'secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, UserRepository, AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
