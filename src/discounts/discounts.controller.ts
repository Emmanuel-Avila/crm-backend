import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/auth.guard';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: CreateDiscountDto) {
    return this.discountService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.discountService.findAll();
  }
}
