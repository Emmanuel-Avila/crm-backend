import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, Election, ElectionDocument } from "./schema/election.schema";
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ElectionDto } from "./dto/election.dto";

@Injectable()
export class ElectionService{
  private logger = new Logger(ElectionService.name);
  constructor(@InjectModel(Election.name) private readonly electionModel: Model<ElectionDocument>){}
  
  async updateElection(election:ElectionDto, files){
    try {
      this.logger.log("Election Service - UPDATE  - Starting")
      const electionB = await this.electionModel.findOne();


      if(files.length !== 0){

        for(let i=0; i<election.addIndexs.length; i++){

          if(election.addIndexs[i]+1 > electionB.documents.length){

            const document = this.uploadFile(files[i],election.documentNames[election.addIndexs[i]],"elecciones");

            electionB.documents.push(document);
            electionB.markModified('documents');
          }else{

            electionB.documents[election.addIndexs[i]] = this.uploadFile(files[i],election.documentNames[election.addIndexs[i]],"elecciones");
          }
        }

      }

      if(election.documentNames.length < electionB.documents.length){
        electionB.documents = electionB.documents.filter(doc => election.documentNames.includes(doc.name));
      }


      if(election.documentNames.length == electionB.documents.length){

        election.documentNames.forEach((docName, index) => {
          electionB.documents[index].name = docName;
        })
        
      }
      
      electionB.markModified('documents');
      // Crear un objeto de datos para guardar en la base de datos

      electionB.image = election.image;
      
      electionB.save();
      this.logger.log("Election Service - UPDATE - Finished")
      return { electionB };
    } catch (error) {
      this.logger.log("Election Service - UPDATE - Failed", error)
      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }
  async findOne(){
    try {
      this.logger.log("Election Service - Find One - Starting")
      const election = await this.electionModel.findOne();

      this.logger.log("Election Service - Find One - Finished")
      return election;
      
    } catch (error) {
      this.logger.log("Election Service - Find One - Failed", error)
      if(error instanceof UnauthorizedException){
        throw new UnauthorizedException ('Credenciales Invalidas')
      }

      return new BadRequestException(error);
    }
  }

  uploadFile(file, name, carpetName): Document{
    console.log(name)
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