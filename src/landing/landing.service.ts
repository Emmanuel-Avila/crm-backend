import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { LandingImages, LandingImagesDocument } from './schemas/landingImages.schema';
import { LandingImagesDto } from "./dto/landingImages.dto";
import { saveImage } from "src/utils/saveImage";

@Injectable()
export class LandingImagesService{
  private logger = new Logger(LandingImagesService.name);
  constructor(@InjectModel(LandingImages.name) private readonly landingModel: Model<LandingImagesDocument>){}

  async find() {
    try {
      this.logger.log("LandingImages Service - FIND - STARTING");

      const images = await this.landingModel.findOne();

      this.logger.log("LandingImages Service - FIND - FINISHED");

      return images;
      
    } catch (error) {
      this.logger.log("LandingImages Service - FIND - Failed", error);

      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

  async updateOne(links: LandingImagesDto) {
    try {
      this.logger.log("LandingImages Service - UPDATE - STARTING");

      for (let i = 0; i < links.links.length; i++) {
        const link = links.links[i];
        saveImage(link)
      }

      const images = await this.landingModel.findOne();
      images.links = links.links;
      images.save()

      this.logger.log("LandingImages Service - UPDATE - FINISHED");

      return images;
    } catch (error) {
      this.logger.log("LandingImages Service - UPDATE - Failed", error);

      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }
}