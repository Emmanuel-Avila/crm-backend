import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { SocialPrevision, SocialPrevisionDocument } from './schemas/socialPrevision.schema';
import { SocialPrevisionDto } from './dto/social.dto';

@Injectable()
export class SocialPrevisionService{
  private logger = new Logger(SocialPrevisionService.name);

  constructor(@InjectModel(SocialPrevision.name) private readonly socialPrevision: Model<SocialPrevisionDocument>){}

  async findOne(){
    try {
      this.logger.log('Social Prevision Service - FIND ONE - STARTING');

      const campaign = await this.socialPrevision.findOne();


      this.logger.log('Social Prevision Service - FIND ONE - FINISHED');

      return campaign;
    } catch (error) {
      this.logger.log('Social Prevision Service - FIND ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

  async edit(body: SocialPrevisionDto){
    try {
      this.logger.log('Social Prevision Service - EDIT ONE - STARTING');

      const campaign = await this.socialPrevision.findOne();

      campaign.image = body.image;
      campaign.text = body.text;
      campaign.title = body.title;

      campaign.save();

      this.logger.log('Social Prevision Service - EDIT ONE - FINISHED');
      return campaign;

    } catch (error) {
      this.logger.log('Social Prevision Service - EDIT ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }


}
