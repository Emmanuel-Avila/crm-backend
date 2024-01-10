import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { DigitalServices, DigitalServicesDocument } from './schemas/digitalServices.schema';
import { DigitalServicesDto } from "./dto/digitalService.dto";

@Injectable()
export class DigitalServicesService{
  private logger = new Logger(DigitalServicesService.name);
  constructor(@InjectModel(DigitalServices.name) private readonly digitalServices:Model<DigitalServicesDocument>){}

  async find (){
    try {
      this.logger.log("DigitalServices Service - FIND - Starting");

      const services = await this.digitalServices.find()

      this.logger.log("DigitalServices Service - FIND - Finished");
      return services;

    } catch (error) {
      this.logger.log("DigitalServices Service - FIND - Failed", error);

      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

  async update(set: DigitalServicesDto){
    try {
      this.logger.log("DigitalServices Service - UPDATE - Starting");

      const services = await this.digitalServices.findOne();

      services.services = set.services;
      
      services.save();
      this.logger.log("DigitalServices Service - UPDATE - Finished");

      return services;
    } catch (error) {
      this.logger.log("DigitalServices Service - UPDATE - Failed", error);

      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

}