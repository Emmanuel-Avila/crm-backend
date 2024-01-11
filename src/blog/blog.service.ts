import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { saveImage } from 'src/utils/saveImage';
import { join } from 'path';

@Injectable()
export class BlogService {
  private logger = new Logger(BlogService.name);
  constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {}

  async create(createBlogDto: CreateBlogDto) {
    try {
      this.logger.log('Blog Service - CREATE POST - STARTING');

      const splittedPath = createBlogDto.image.split("/");
      const imageName = splittedPath[splittedPath.length -1]
      saveImage(createBlogDto.image, join(__dirname, '..', '..', 'static', imageName), () => console.log("file saved"))

      const post = await this.postModel.create(createBlogDto);
      this.logger.log('Blog Service - CREATE POST - FINISHED');
      return post;
    } catch (error) {
      this.logger.log('Blog Service - CREATE POST - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      }
    }
  }

  async findAll() {
    try {
      this.logger.log('Blog Service - FIND ALL POST - STARTING');
      const post = await this.postModel.find();
      this.logger.log('Blog Service - FIND ALL POST - FINISHED');
      return post;
    } catch (error) {
      this.logger.log('Blog Service - FIND ALL POST - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      }
    }
  }
}
