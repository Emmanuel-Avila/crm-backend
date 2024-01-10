import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { Us, UsDocument } from "./schemas/us.schema";
import { UsDto } from "./dto/us.dto";

@Injectable()
export class UsService{
  
  private logger = new Logger(UsService.name);
  constructor(@InjectModel(Us.name) private readonly usModel: Model<UsDocument>){}

  async find(){
    try {
      this.logger.log("Us Service - FIND - Starting");
      const us = await this.usModel.findOne();

      this.logger.log("Us Service - FIND - Finished");
      return us;
    } catch (error) {
      this.logger.log("Us Service - FIND - Failed", error);

      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

  async updateUs(body:UsDto){
    try {
      this.logger.log("Us Service - UPDATE - Starting");
      const us = await this.usModel.findOne();
      us.vission = body.vission;
      us.mission = body.mission;

      us.educationCommitte.president = body.educationComittePresident;
      us.educationCommitte.secretary = body.educationComitteSecretary;
      us.educationCommitte.vicepresident = body.educationComitteVice;
      us.educationCommitte.vocal = body.educationComitteVocal;
      us.markModified("educationCommitte");

      us.electoralCommitte.president= body.electoralComittePresident;
      us.electoralCommitte.secretary = body.electoralComitteSecretary;
      us.electoralCommitte.vicepresident = body.electoralComitteVice;
      us.electoralCommitte.vocal = body.electoralComitteVocal;
      us.markModified("electoralCommitte");

      us.administracionCouncel.president = body.administracionCouncelPresident;
      us.administracionCouncel.secretary = body.administracionCouncelSecretary;
      us.administracionCouncel.vicepresident = body.administracionCouncelVice;
      us.administracionCouncel.firstVocal = body.administracionCouncelVocal;
      us.administracionCouncel.secondVocal = body.administracionCouncel2Vocal;
      us.administracionCouncel.thirdVocal = body.administracionCouncel3Vocal;
      us.markModified("administracionCouncel");

      us.vigilanceCouncel.president = body.vigilanceCouncelPresident;
      us.vigilanceCouncel.secretary = body.vigilanceCouncelSecretary;
      us.vigilanceCouncel.vicepresident = body.vigilanceCouncelVice;
      us.vigilanceCouncel.vocal = body.vigilanceCouncelVocal;
      us.markModified("vigilanceCouncel");

      await us.save();
      this.logger.log("Us Service - UPDATE - FINISHED");
      console.log(us);
      return us;
    } catch (error) {
      this.logger.log("Us Service - FIND - Failed", error);

      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

}