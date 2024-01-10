import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DigitalServicesService } from './digitalServices.service';
import { AuthGuard } from 'src/users/auth.guard';
import { DigitalServicesDto } from './dto/digitalService.dto';

@Controller('digital-services')
export class DigitalServicesController{
  constructor(private readonly digitalService : DigitalServicesService){}

  @UseGuards(AuthGuard)
  @Get()
  find(){
    return this.digitalService.find();
  }

  @UseGuards(AuthGuard)
  @Post()
  updateAll(@Body() set:DigitalServicesDto){

    return this.digitalService.update(set);
  }
}