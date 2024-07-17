import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config.module';
import { PostModule } from './core/post/post.module';
import { UserModule } from './core/user/user.module';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './core/auth/auth.module';
import { CheckOwnerMiddleware } from './middleware/check.owner.middleware';

@Module({
  imports: [ConfigModule, PrismaModule, PostModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckOwnerMiddleware)
      .forRoutes(
        { path: 'users/:id', method: RequestMethod.GET },
        { path: 'users/:id', method: RequestMethod.PUT },
        { path: 'users/:id', method: RequestMethod.DELETE },
        { path: 'posts/:id', method: RequestMethod.PUT },
        { path: 'posts/:id', method: RequestMethod.DELETE },
      );
  }
}
