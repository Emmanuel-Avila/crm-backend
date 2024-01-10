import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { AccountsService } from './accounts.services';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService){}

  @UseGuards(AuthGuard)
  @Post('edit')
  editAccount(@Body() body){
    return this.accountsService.editOne(body);
  }

  @UseGuards(AuthGuard)
  @Get(':identifier')
  findOne(@Param('identifier') identifier: string){
    return this.accountsService.findOne(identifier);
  }
}