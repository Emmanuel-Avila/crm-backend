import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsService } from './us.service';
import { AuthGuard } from '../users/auth.guard';
import { UsDto } from './dto/us.dto';

@Controller('us')
export class UsController {
  constructor(private readonly usService:UsService){}

  @UseGuards(AuthGuard)
  @Get()
  find(){
    return this.usService.find();
  }

  @UseGuards(AuthGuard)
  @Post()
  updateUs(@Body() us: UsDto){
    return this.usService.updateUs(us);
  }
}
