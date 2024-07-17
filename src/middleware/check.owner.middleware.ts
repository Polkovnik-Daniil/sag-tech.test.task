import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import GetUserFromTokenRequest from 'src/core/auth/get.user.from.token.request';

@Injectable()
export class CheckOwnerMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const user: User = GetUserFromTokenRequest(req, this.jwtService);
    if (user.role != 'Admin') {
      if (req.params.id != user.id) {
        throw new ForbiddenException();
      }
    }
    next();
  }
}
