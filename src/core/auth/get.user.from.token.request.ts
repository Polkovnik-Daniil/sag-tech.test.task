import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Request } from 'express';

export default function GetUserFromTokenRequest(
  req: Request,
  jwtService: JwtService,
): User {
  const authHeader: string = req.headers.authorization;
  const bearer: string = authHeader.split(' ')[0];
  const token: string = authHeader.split(' ')[1];
  if (bearer !== 'Bearer' || !token) {
    throw new UnauthorizedException({ message: 'Unauthorized user' });
  }
  const user = jwtService.verify(token);
  return user;
}
