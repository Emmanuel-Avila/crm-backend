import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { TrainingService } from './training.service';
import { TrainingDto } from './dto/training.dto';

@Controller('training')
export class TrainingController{
  constructor(private readonly trainingService: TrainingService){}

  @UseGuards(AuthGuard)
  @Get()
  findOne(){
    return this.trainingService.findOne();
  }

  @UseGuards(AuthGuard)
  @Post()
  updateHealthCampaign(@Body() body: TrainingDto){
    return this.trainingService.edit(body);
  }
  
}