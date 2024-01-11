import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { HealthDocument, Health } from './schemas/health.schema';
import { HealthCampaignDto } from './dto/health.dto';
import { saveImage } from 'src/utils/saveImage';

@Injectable()
export class HealthService{
  private logger = new Logger(HealthService.name);

  constructor(@InjectModel(Health.name) private readonly healthCampaign: Model<HealthDocument>){}


  async findOne(){
    try {
      this.logger.log('Health Service - FIND ONE - STARTING');

      const campaign = await this.healthCampaign.findOne();


      this.logger.log('Health Service - FIND ONE - FINISHED');

      return campaign;
    } catch (error) {
      this.logger.log('Health Service - FIND ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

  async edit(body: HealthCampaignDto){
    try {
      this.logger.log('Health Service - Edit ONE - STARTING');

      saveImage(body.image);

      const campaign = await this.healthCampaign.findOne();

      campaign.image = body.image;
      campaign.text = body.text;
      campaign.title = body.title;

      campaign.save();

    } catch (error) {
      this.logger.log('Health Service - Edit ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

}