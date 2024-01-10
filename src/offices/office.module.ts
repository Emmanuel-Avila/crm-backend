import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { OfficesSchema, Offices } from './schemas/office.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Offices.name, schema: OfficesSchema }]), UsersModule],
  controllers: [OfficeController],
  providers: [OfficeService],
  exports: [OfficeService]
})
export class OfficeModule{}