import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CovenantDocument, Covenant } from './schemas/covenant.schema';
import { CreateCovenantDto } from './dto/create-covenant.dto';
import { saveImage } from 'src/utils/saveImage';

@Injectable()
export class CovenantService{
  private logger = new Logger(CovenantService.name);
  constructor(@InjectModel(Covenant.name) private readonly covenantModel: Model<CovenantDocument>){}

  async create(body: CreateCovenantDto){
    try {
      this.logger.log('Covenant Service - CREATE Covenant - STARTING');
      
      saveImage(body.image);

      const Covenant = await this.covenantModel.create(body);
      this.logger.log('Covenant Service - CREATE Covenant - FINISHED');
      return Covenant;
    } catch (error) {
      this.logger.log('Covenant Service - CREATE Covenant - FAILED', error);
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
      this.logger.log('Covenant Service - FIND ALL Covenant - STARTING');
      const post = await this.covenantModel.find();
      this.logger.log('Covenant Service - FIND ALL Covenant - FINISHED');
      return post;
    } catch (error) {
      this.logger.log('Covenant Service - FIND ALL Covenant - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      }
    }
  }

}