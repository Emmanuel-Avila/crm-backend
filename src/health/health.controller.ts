import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { HealthService } from './health.service';
import { HealthCampaignDto } from './dto/health.dto';

@Controller('health')
export class HealthController{
  constructor(private readonly healthService: HealthService){}

  @UseGuards(AuthGuard)
  @Get()
  findOne(){
    return this.healthService.findOne();
  }

  @UseGuards(AuthGuard)
  @Post()
  updateHealthCampaign(@Body() body: HealthCampaignDto){
    return this.healthService.edit(body);
  }
}