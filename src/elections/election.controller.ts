import { Body, Controller, Get, HttpStatus, Param, UseGuards, Post, UploadedFiles, UseInterceptors, UsePipes, BadRequestException  } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from '../users/auth.guard';
import { ElectionDto } from "./dto/election.dto";
import { ElectionService } from "./election.service";
import { TransformDocumentNamesPipe } from "./pipes/documet.pipe";

@Controller('election')
export class ElectionController{
  constructor(private readonly electionService: ElectionService){}

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new TransformDocumentNamesPipe())
  @UseInterceptors(FilesInterceptor('files', 10 ,{
    dest: 'uploads/'
  }))
  updateTransparency(@Body() body, @UploadedFiles( ) files: Array<Express.Multer.File>){
    if(body.error){
      throw new BadRequestException(body);
    }
    return this.electionService.updateElection(body, files);
  }

  @UseGuards(AuthGuard)
  @Get()
  findOne(){
    return this.electionService.findOne();
  }
}