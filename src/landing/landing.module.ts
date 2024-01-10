import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LandingImagesController } from './landing.controller';
import { LandingImagesService } from './landing.service';
import { LandingImages, LandingImagesSchema } from './schemas/landingImages.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: LandingImages.name, schema: LandingImagesSchema }]), UsersModule],
  controllers: [LandingImagesController],
  providers: [ LandingImagesService],
  exports: [LandingImagesService]
})
export class LandingImagesModule{}