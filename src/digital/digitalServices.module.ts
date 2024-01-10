import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DigitalServicesController } from './digitalServices.controller';
import { DigitalServicesService } from './digitalServices.service';
import { DigitalServices, DigitalServicesSchema } from './schemas/digitalServices.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: DigitalServices.name, schema: DigitalServicesSchema }]), UsersModule],
  controllers: [DigitalServicesController],
  providers: [DigitalServicesService],
  exports: [DigitalServicesService]
})
export class DigitalServicesModule{}