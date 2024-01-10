import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Post, PostSchema } from './schemas/post.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), UsersModule],
  controllers: [BlogController],
  providers: [BlogService,],
  exports: [BlogService]
})
export class BlogModule {}
