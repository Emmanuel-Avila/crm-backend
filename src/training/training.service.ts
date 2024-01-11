import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { TrainingDocument, Training } from './schemas/training.schema';
import { TrainingDto } from './dto/training.dto';
import { saveImage } from 'src/utils/saveImage';

@Injectable()
export class TrainingService {
  private logger = new Logger(TrainingService.name);

  constructor(@InjectModel(Training.name) private readonly trainingModel: Model<TrainingDocument>){}

  async findOne(){
    try {
      this.logger.log('Training Service - FIND ONE - STARTING');

      const training = await this.trainingModel.findOne();


      this.logger.log('Training Service - FIND ONE - FINISHED');

      return training;
    } catch (error) {
      this.logger.log('Training Service - FIND ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

  async edit(body: TrainingDto){
    try {
      this.logger.log('Training Service - EDIT ONE - STARTING');

      saveImage(body.image);

      const training = await this.trainingModel.findOne();

      training.image = body.image;
      training.text = body.text;
      training.title = body.title;

      training.save();

      this.logger.log('Training Service - EDIT ONE - FINISHED');
      return training;
    } catch (error) {
      this.logger.log('Training Service - EDIT ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

}