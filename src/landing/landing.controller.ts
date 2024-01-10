import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LandingImagesService } from './landing.service';
import { AuthGuard } from 'src/users/auth.guard';
import { LandingImagesDto } from './dto/landingImages.dto';

@Controller('images')
export class LandingImagesController {
  constructor(private readonly landingService:LandingImagesService){}
  @UseGuards(AuthGuard)
  @Get()
  find(){
    return this.landingService.find();
  }

  @UseGuards(AuthGuard)
  @Post()
  update(@Body() links: LandingImagesDto){
    return this.landingService.updateOne(links);
  }
}