import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { CovenantSchema, Covenant } from './schemas/covenant.schema';
import { CovenantService } from './covenant.service';
import { CovenantController } from './covenant.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Covenant.name, schema: CovenantSchema }]), UsersModule],
  controllers: [CovenantController],
  providers: [CovenantService,],
  exports: [CovenantService]
})
export class CovenantModule {}