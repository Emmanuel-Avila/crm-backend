import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Complaints, ComplaintsDocument } from './schema/complaint.schema';
import { Comments, CommentsDocument } from './schema/comment.schema';
import { Responses, ResponsesDocument } from './schema/responses.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { UpdateComplainDto } from './dto/updateComplaint.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { UpdateResponseDto } from './dto/updateResponse.dto';


@Injectable()
export class ComplaintService {

  private logger = new Logger(ComplaintService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Complaints.name) private readonly complaintsModel: Model<ComplaintsDocument>,
    @InjectModel(Comments.name) private readonly commentModel: Model<CommentsDocument>,
    @InjectModel(Responses.name) private readonly responsesModel: Model<ResponsesDocument>,

    ){
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_AUTH_USER,
          pass: process.env.SMTP_AUTH_PASS
        }
      })
    }
  
  async findAll(){
    try {
      this.logger.log('Complaints Service - FIND COMPLAINTS - STARTING');

      const allComplaints = await this.complaintsModel.find();

      this.logger.log('Complaints Service - FIND COMPLAINTS - FINISHED');
      return allComplaints;
    } catch (error) {
      this.logger.log('Complaints Service - FIND COMPLAINTS - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

  async findOne(id: string){
    try {
      this.logger.log('Complaints Service - FIND ONE COMPLAINT - STARTING');
      const complaint = await this.complaintsModel.findById(id);
      const comments = await this.commentModel.findById(complaint.comments);
      const responses = await this.responsesModel.find();
      this.logger.log('Complaints Service - FIND ONE COMPLAINT - FINISHED');
      return {complaint, comments, responses}
    } catch (error) {
      this.logger.log('Complaints Service - FIND ONE COMPLAINT - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

  async filterDate(greater: string, lesser: string){
    try {
      this.logger.log('Complaints Service - Filter Date - STARTING');

      
      let filter = {}
      if(greater && lesser){
        filter = {
          sentDate: {
            $gte: new Date(greater),
            $lte: new Date(lesser),
          }
        }
      }else if( greater ){
        filter = {
          sentDate: {
            $gte: new Date(greater),
          }
        }
      }else if(lesser){
        filter = {
          sentDate: {
            $lte: new Date(lesser),
          }
        }
      }

      const filteredComplaints = await this.complaintsModel.find(filter);

      this.logger.log('Complaints Service - Filter Date  - FINISHED');
      return filteredComplaints;
    } catch (error) {
      this.logger.log('Complaints Service - Filter Date  - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }

  }

  async updateOne(body: UpdateComplainDto){
    try {
      this.logger.log('Complaints Service - UPDATE ONE  - STARTING');

      const complaint = await this.complaintsModel.findById(body.id);

      const mailOptions: nodemailer.SendMailOptions = {
        from: ' "Libro de Reclamos" cdm@larehabilitadora.com',
        to: complaint.email,
        subject: `Libro de Reclamaciones - ${complaint.code}`,
        text: '',
        html: `<div style="max-width: 40rem; margin: 0 auto;">
        <h1 style="line-height: 1.3; margin: 3rem 0px 0px; text-align: center;">Libro de Reclamaciones</h1>
        <h2 style="line-height: 1.5; text-align: center;">Gracias por la espera ${complaint.names}</h2>
        <p style="text-align: center;">Su caso registrado con c&oacute;digo ${complaint.code} ha sido atendido.</p>
        <p style="text-align: center;">Puedes revisar el resultado usando en el siguiente enlace:</p>
        <p style="text-align: center;"> <a href="${process.env.VITE_REHABILITADORA_URI}/consulta/${complaint.code}" target="_blank" rel="noopener" aria-invalid="true">REVISAR ESTADO DE MI RECLAMO</a></p>
        </div>`,
      }
      
      complaint.action = body.action;
      complaint.state = body.state;

      const updatedComplaint = await complaint.save()

      const result = await this.transporter.sendMail(mailOptions);

      this.logger.log('Complaints Service - UPDATE ONE  - FINISHED');

      return updatedComplaint;
    } catch (error) {
      this.logger.log('Complaints Service - UPDATE ONE  - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

  async sendResponse(body:UpdateCommentDto, files){
    try {
      this.logger.log('Complaints Service - SEND RESPONSE  - STARTING');
      
      const filesLinks = [];
      const fileLocation = [];

      for(let i=0; i<files.length; i++){
        const uploadedFile = this.uploadFile(files[i], 'complaints');
        filesLinks.push(uploadedFile.url);
        fileLocation.push({path: uploadedFile.location});
      }

      const complaint = await this.complaintsModel.findOneAndUpdate({code: body.complaintCode}, {responseDate: new Date(body.responseDate)});
      const comment = await this.commentModel.findById(body.commentId);
      comment.messages.push(body.text);
      filesLinks.forEach((link, index) => {
        comment.documents.push(link)
      });
      const mailOptions: nodemailer.SendMailOptions = {
        from: ' "Libro de Reclamos" cdm@larehabilitadora.com',
        to: body.email,
        subject: `Libro de Reclamaciones - ${body.complaintCode}`,
        text: '',
        html: `<div style="max-width: 40rem; margin: 0 auto;">
        <h1 style="line-height: 1.3; margin: 3rem 0px 0px; text-align: center;">Libro de Reclamaciones</h1>
        <h2 style="text-align: center;"><span style="font-size: 27px;">Hola ${body.clientNames}</span></h2>
        <p style="line-height: 1.5; text-align: center;">${body.text}</p>
        </div>`,
        attachments: fileLocation
      }
      
        
      const result = await this.transporter.sendMail(mailOptions);
        
      comment.save()
      this.logger.log('Complaints Service - SEND RESPONSE  - FINISHED');
      return comment;
    } catch (error) {
      this.logger.log('Complaints Service - SEND RESPONSE  - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

  async getResponses(){
    try {
      this.logger.log('Complaints Service - GET RESPONSES  - STARTING');

      const responses = await this.responsesModel.find();


      this.logger.log('Complaints Service - GET RESPONSES  - FINISHED');

      return responses;
    } catch (error) {
      this.logger.log('Complaints Service - GET RESPONSES  - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

  async updateResponse(body: UpdateResponseDto){

    try {
      this.logger.log('Complaints Service - UPDATE RESPONSE  - STARTING');
      const response = await this.responsesModel.findById(body.id)

      response.text = body.text;
      const updatedR = await response.save();

      this.logger.log('Complaints Service - UPDATE RESPONSE  - FINISHED');

      return updatedR;
    } catch (error) {
      this.logger.log('Complaints Service - UPDATE RESPONSE  - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

  uploadFile(file, carpetName){
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

    return {
      location: newPath,
      url: completeUrl
    }
  }

}