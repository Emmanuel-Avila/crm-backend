import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { ModalDto } from "./dto/modal.dto";
import { ModalDocument, Modal } from "./schema/modal.schema";
import { saveImage } from 'src/utils/saveImage';

@Injectable()
export class ModalService{
  private logger = new Logger(ModalService.name);
  constructor(@InjectModel(Modal.name)private readonly modalModel : Model<ModalDocument>){}

  async findOne(){
    try {
      this.logger.log("Modal Service - FIND ONE - Starting");
      const modal = await this.modalModel.findOne();

      this.logger.log("Modal Service - FIND ONE - Finished");

      return modal;

    } catch (error) {
      this.logger.log("Modal Service - FIND ONE - Failed", error);

      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

  async editOne(body: ModalDto){
    try {
      this.logger.log("Modal Service - EDIT ONE - Starting");

      const modal = await this.modalModel.findOne();
      saveImage(body.image);

      modal.image = body.image;
      modal.link = body.link;

      modal.save();
      this.logger.log("Modal Service - EDIT ONE - Finished");

      return modal;

    } catch (error) {
      this.logger.log("Modal Service - EDIT ONE - Failed", error);

      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

}