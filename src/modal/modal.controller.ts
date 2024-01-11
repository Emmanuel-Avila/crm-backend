import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { ModalService } from './modal.service';
import { ModalDto } from './dto/modal.dto';

@Controller('modal')
export class ModalController{
  constructor(private readonly modalService: ModalService){}

  @UseGuards(AuthGuard)
  @Get()
  find(){
    return this.modalService.findOne();
  }

  @UseGuards(AuthGuard)
  @Post()
  update(@Body() body:ModalDto){
    return this.modalService.editOne(body);
  }
}