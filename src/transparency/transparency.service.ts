import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, Transparency, TransparencyDocument } from "./schemas/transparency.schema";
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { TransparencyDto } from "./dto/transparency.dto";
@Injectable()
export class TransparencyService{
  private logger = new Logger(TransparencyService.name);
  constructor(@InjectModel(Transparency.name) private readonly transparencyModel: Model<TransparencyDocument>
  ){}

  async updateTransparency(transparency:TransparencyDto, files){
    try {
      this.logger.log("Transparency Service - UPDATE  - Starting")
      const transparencyB = await this.transparencyModel.findOne();

      if(files.length !== 0){

        for(let i=0; i<transparency.addIndexs.length; i++){
          if(transparency.addIndexs[i]+1 > transparencyB.documents.length){
            
            const document = this.uploadFile(files[i],transparency.documentNames[transparency.addIndexs[i]],"transparencia");

            transparencyB.documents.push(document);
            transparencyB.markModified('documents');
          }else{

            transparencyB.documents[transparency.addIndexs[i]] = this.uploadFile(files[i],transparency.documentNames[transparency.addIndexs[i]],"transparencia");
          }
        }

      }

      if(transparency.documentNames.length < transparencyB.documents.length){
        transparencyB.documents = transparencyB.documents.filter(doc => transparency.documentNames.includes(doc.name));
      }


      if(transparency.documentNames.length == transparencyB.documents.length){

        transparency.documentNames.forEach((docName, index) => {
          transparencyB.documents[index].name = docName;
        })
        
      }
      
      transparencyB.markModified('documents');
      // Crear un objeto de datos para guardar en la base de datos
      const datosGuardar = {
        clients: [],
        institutional: []
      };

      // Llenar los campos 'clients' con los datos del front-end
      for (let i = 0; i < transparency.clientsText.length; i++) {
        datosGuardar.clients.push({
          name: transparency.clientsName[i],
          text: transparency.clientsText[i]
        });
      }

      // Llenar los campos 'institutional' con los datos del front-end
      for (let i = 0; i < transparency.institutionalText.length; i++) {
        datosGuardar.institutional.push({
          name: transparency.institutionalName[i],
          text: transparency.institutionalText[i]
        });
      }



      transparencyB.clients = datosGuardar.clients;
      transparencyB.markModified('clients');
      transparencyB.institutional = datosGuardar.institutional;
      transparencyB.markModified('institutional');
      
      transparencyB.save();
      this.logger.log("Transparency Service - UPDATE - Finished")
      return { transparencyB };
    } catch (error) {
      this.logger.log("Transparency Service - UPDATE - Failed", error)
      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

  async findOne(){
    try {
      this.logger.log("Transparency Service - Find One - Starting")
      const transparency = await this.transparencyModel.findOne();

      this.logger.log("Transparency Service - Find One - FInished")
      return transparency;
      
    } catch (error) {
      this.logger.log("Transparency Service - Find One - Failed", error)
      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

  uploadFile(file, name, carpetName): Document{
    const newFileName = `upload_${Date.now()}${path.extname(file.originalname)}`;
    const publicUploadsPath = path.join(__dirname, '..', '..', 'public', 'uploads', carpetName);
    const newPath = path.join(publicUploadsPath,newFileName);

    const uploadsBaseUrl = process.env.SERVER;
    const relativePath = `uploads/${carpetName}/${newFileName}`;
    const completeUrl = `${uploadsBaseUrl}/${relativePath}`;


    if (!fs.existsSync(publicUploadsPath)) {
      fs.mkdirSync(publicUploadsPath, { recursive: true });
    }

    fs.renameSync(file.path, newPath);


    const document = {
      name: name || file.originalname,
      link: completeUrl,
    }
    return document
  }
}