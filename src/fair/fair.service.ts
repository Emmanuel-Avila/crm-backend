import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { FairDocument, Fair } from './schemas/fair.schema';
import { FairDto } from './dto/fair.dto';

@Injectable()
export class FairService {
  private logger = new Logger(FairService.name);

  constructor(@InjectModel(Fair.name) private readonly fairModel: Model<FairDocument>){}

  async findOne(){
    try {
      this.logger.log('Events fair - FIND ONE - STARTING');

      const fair = await this.fairModel.findOne();


      this.logger.log('Events fair - FIND ONE - FINISHED');

      return fair;
    } catch (error) {
      this.logger.log('Events fair - FIND ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

  async edit(body: FairDto){
    try {
      this.logger.log('Events fair - EDIT ONE - STARTING');

      const fair = await this.fairModel.findOne();

      fair.image = body.image;
      fair.text = body.text;
      fair.title = body.title;

      fair.save();

      this.logger.log('Events fair - EDIT ONE - FINISHED');
      return fair;
    } catch (error) {
      this.logger.log('Events fair - EDIT ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

}