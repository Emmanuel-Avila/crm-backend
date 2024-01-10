import { Body, Controller, Get, HttpStatus, Param, UseGuards, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { TransparencyService } from './transparency.service';
import { TransparencyDto } from "./dto/transparency.dto";
import { AuthGuard } from '../users/auth.guard';


@Controller('transparency')
export class TransparencyController{
  constructor(private readonly transparencyService: TransparencyService){}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files', 10 ,{
    dest: 'uploads/'
  }))
  updateTransparency(@Body() body:TransparencyDto, @UploadedFiles( ) files: Array<Express.Multer.File>){

    return this.transparencyService.updateTransparency(body, files);
  }

  @UseGuards(AuthGuard)
  @Get()
  findOne(){
    return this.transparencyService.findOne();
  }
}