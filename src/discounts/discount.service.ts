import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiscountDocument, Discount } from './schemas/discount.schema';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Injectable()
export class DiscountService{
  private logger = new Logger(DiscountService.name);
  constructor(@InjectModel(Discount.name) private readonly discountModel: Model<DiscountDocument>){}

  async create(body: CreateDiscountDto){
    try {
      this.logger.log('Discount Service - CREATE DISCOUNT - STARTING');
      const discount = await this.discountModel.create(body);
      this.logger.log('Discount Service - CREATE DISCOUNT - FINISHED');
      return discount;
    } catch (error) {
      this.logger.log('Discount Service - CREATE DISCOUNT - FAILED', error);
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
      this.logger.log('Discount Service - FIND ALL DISCOUNT - STARTING');
      const post = await this.discountModel.find();
      this.logger.log('Discount Service - FIND ALL DISCOUNT - FINISHED');
      return post;
    } catch (error) {
      this.logger.log('Discount Service - FIND ALL DISCOUNT - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      }
    }
  }

}