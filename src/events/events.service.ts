import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { Event, EventDocument } from './schemas/events.schema';
import { EventDto } from './dto/events.dto';

@Injectable()
export class EventService {
  private logger = new Logger(EventService.name);

  constructor(@InjectModel(Event.name) private readonly eventModel: Model<EventDocument>){}

  async findOne(){
    try {
      this.logger.log('Events Service - FIND ONE - STARTING');

      const service = await this.eventModel.findOne();


      this.logger.log('Events Service - FIND ONE - FINISHED');

      return service;
    } catch (error) {
      this.logger.log('Events Service - FIND ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

  async edit(body: EventDto){
    try {
      this.logger.log('Events Service - EDIT ONE - STARTING');

      const service = await this.eventModel.findOne();

      service.image = body.image;
      service.text = body.text;
      service.title = body.title;

      service.save();

      this.logger.log('Events Service - EDIT ONE - FINISHED');
      return service;
    } catch (error) {
      this.logger.log('Events Service - EDIT ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

}