import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsService } from './us.service';
import { UsController } from './us.controller';
import { Us, UsSchema } from './schemas/us.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Us.name, schema: UsSchema }]), UsersModule],
  controllers: [UsController],
  providers: [UsService,],
  exports: [UsService]
})
export class UsModule {

}