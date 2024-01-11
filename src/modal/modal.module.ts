import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { ModalController } from './modal.controller';
import { ModalService } from './modal.service';
import { Modal, ModalSchema } from './schema/modal.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Modal.name, schema: ModalSchema }]), UsersModule],
  controllers: [ModalController],
  providers: [ ModalService],
  exports: [ModalService]
})
export class ModalModule{}