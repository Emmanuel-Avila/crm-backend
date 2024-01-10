import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/auth.guard';
import { CovenantService } from './covenant.service';
import { CreateCovenantDto } from './dto/create-covenant.dto';

@Controller('covenant')
export class CovenantController {
  constructor(private readonly covenantService: CovenantService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateCovenantDto) {
    return this.covenantService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.covenantService.findAll();
  }
}
