import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  //+
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() postData: { title: string; content?: string; userId: string },
  ): Promise<PostModel> {
    const { title, content, userId } = postData;
    return this.postService.createPost({
      title,
      content,
      userId,
    });
  }
  //+
  @Get()
  @UseGuards(JwtAuthGuard)
  async getPosts(): Promise<PostModel[]> {
    return this.postService.posts({});
  }
  //+
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: id });
  }
  //+
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(UsersGuard)
  async updatePost(
    @Param('id') id: string,
    @Body() post: PostModel,
  ): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: id },
      data: post,
    });
  }
  //+
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(UsersGuard)
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: id });
  }
}
