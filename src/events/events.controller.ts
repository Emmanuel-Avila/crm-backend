import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { EventService } from './events.service';
import { EventDto } from './dto/events.dto';

@Controller('event')
export class EventController{
  constructor(private readonly eventService: EventService){}

  @UseGuards(AuthGuard)
  @Get()
  findOne(){
    return this.eventService.findOne();
  }

  @UseGuards(AuthGuard)
  @Post()
  updateEvent(@Body() body: EventDto){
    return this.eventService.edit(body);
  }
  
}