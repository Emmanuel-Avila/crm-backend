import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "src/users/users.module";
import { TrainingService } from "./training.service";
import { TrainingController } from './training.controller';
import { TrainingSchema, Training } from "./schemas/training.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: Training.name, schema: TrainingSchema}]), UsersModule],
  controllers: [TrainingController],
  providers: [TrainingService],
  exports: [TrainingService]
})
export class TrainingModule {}