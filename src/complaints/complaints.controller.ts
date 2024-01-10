import { Controller, Get, Post, Body, UploadedFiles, UseInterceptors, UseGuards } from '@nestjs/common';
import { ComplaintService } from './complaints.service';
import { FilesInterceptor } from "@nestjs/platform-express";
import { ComplaintDto } from './dto/complaints.dto';
import { AuthGuard } from 'src/users/auth.guard';
import { UpdateComplainDto } from './dto/updateComplaint.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { UpdateResponseDto } from './dto/updateResponse.dto';

// import { FileUpload } from 'express';

@Controller('complaints')
export class ComplaintsController{
  constructor(private readonly complaintService: ComplaintService){}

  // @Post()
  // @UseInterceptors(FilesInterceptor('documents', 3 ,{
  //   dest: 'uploads/'
  // }))

  @UseGuards(AuthGuard)
  @Get()
  getAll(){
    return this.complaintService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('filter')
  filterDate(@Body() body){
    return this.complaintService.filterDate(body.greater, body.lesser);
  }

  @UseGuards(AuthGuard)
  @Post('id')
  findOne(@Body() body: {id:string}){
    return this.complaintService.findOne(body.id);
  }

  @UseGuards(AuthGuard)
  @Post('updateOne')
  updateOne(@Body() body: UpdateComplainDto){
    return this.complaintService.updateOne(body);
  }



  @UseGuards(AuthGuard)
  @Post('send-response')
  @UseInterceptors(FilesInterceptor('documents', 2 ,{
    dest: 'uploads/'
  }))
  sendReponse(@Body() body:UpdateCommentDto,@UploadedFiles() documents:Array<Express.Multer.File> ){

    return this.complaintService.sendResponse(body, documents);
  }


  @UseGuards(AuthGuard)
  @Get('responses')
  getResponses(){
    return this.complaintService.getResponses();
  }

  @UseGuards(AuthGuard)
  @Post('update-response')
  updateResponse(@Body() body: UpdateResponseDto){
    return this.complaintService.updateResponse(body);
  }
  
}