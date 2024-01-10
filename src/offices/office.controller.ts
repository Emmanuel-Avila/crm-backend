import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { OfficeService } from './office.service';
import { OfficeDto } from './dto/office.dto';

@Controller('office')
export class OfficeController{
  constructor(private readonly officeService: OfficeService){}

  @UseGuards(AuthGuard)
  @Get()
  findOne(){
    return this.officeService.findOne();
  }

  @UseGuards(AuthGuard)
  @Post()
  update(@Body() body:OfficeDto){
    return this.officeService.update(body);
  }
}