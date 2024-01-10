import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { SocialPrevisionService } from './socialPrevision.service';
import { SocialPrevisionDto } from './dto/social.dto';

@Controller('social')
export class SocialPrevisionController{
  constructor(private readonly socialPrevisionService: SocialPrevisionService){}

  @UseGuards(AuthGuard)
  @Get()
  findOne(){
    return this.socialPrevisionService.findOne();
  }

  @UseGuards(AuthGuard)
  @Post()
  updateHealthCampaign(@Body() body: SocialPrevisionDto){
    return this.socialPrevisionService.edit(body);
  }
  
}