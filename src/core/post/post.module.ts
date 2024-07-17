import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma.module';
import { PostRepository } from './repository/post.repository';
@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
  exports: [PostRepository],
})
export class PostModule {}
