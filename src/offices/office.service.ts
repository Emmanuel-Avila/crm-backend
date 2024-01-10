import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { OfficesDocument, Offices } from "./schemas/office.schema";
import { OfficeDto } from "./dto/office.dto";

@Injectable()
export class OfficeService{
  private logger = new Logger(OfficeService.name);
  constructor(@InjectModel(Offices.name) private readonly officeModel:Model<OfficesDocument>){}

  async findOne(){
    try {
      this.logger.log("Office Service - FIND - Starting");

      const services = await this.officeModel.findOne();

      this.logger.log("Office Service - FIND - Finished");
      return services;

    } catch (error) {
      this.logger.log("Office Service - FIND - Failed", error);

      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

  async update(set: OfficeDto){
    try {
      this.logger.log("Office Service - UPDATE - Starting");

      const offices = await this.officeModel.findOne();

      offices.offices = set.offices;
      
      offices.save();
      this.logger.log("Office Service - UPDATE - Finished");

      return offices;
    } catch (error) {
      this.logger.log("Office Service - UPDATE - Failed", error);

      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

}
