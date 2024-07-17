import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostService {
  constructor(private repository: PostRepository) {}

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.repository.post(postWhereUniqueInput);
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.repository.posts({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    return this.repository.createPost(data);
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.repository.updatePost({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.repository.deletePost(where);
  }
}
