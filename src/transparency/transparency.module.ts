import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { TransparencyController } from './transparency.controller';
import { TransparencyService } from './transparency.service';
import { TransparencySchema, Transparency } from './schemas/transparency.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: 
  [
    MongooseModule.forFeature([{ name: Transparency.name, schema: TransparencySchema }]), 
    UsersModule,
    MulterModule.register({ dest: '../uploads' })
  ],
  controllers: [TransparencyController],
  providers: [TransparencyService],
  exports: [TransparencyService]
})
export class TransparencyModule{}