import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ElectionController } from './election.controller';
import { ElectionService } from './election.service';
import { ElectionSchema, Election } from './schema/election.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: 
  [
    MongooseModule.forFeature([{ name: Election.name, schema: ElectionSchema }]), 
    UsersModule,
    MulterModule.register({ dest: '../uploads' })
  ],
  controllers: [ElectionController],
  providers: [ElectionService],
  exports: [ElectionService]
})
export class ElectionModule{}