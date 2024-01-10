import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { FairService } from './fair.service';
import { FairDto } from './dto/fair.dto';

@Controller('fair')
export class FairController {
  constructor(private readonly fairService: FairService){}

  @UseGuards(AuthGuard)
  @Get()
  findOne(){
    return this.fairService.findOne();
  }

  @UseGuards(AuthGuard)
  @Post()
  updateFair(@Body() body: FairDto){
    return this.fairService.edit(body);
  }
  
}