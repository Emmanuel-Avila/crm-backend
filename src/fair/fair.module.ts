import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "src/users/users.module";
import { FairController } from "./fair.controller";
import { FairService } from "./fair.service";
import { FairSchema, Fair } from "./schemas/fair.schema";

@Module({
  imports: [MongooseModule.forFeature([{name:Fair.name, schema: FairSchema}]), UsersModule],
  controllers: [FairController],
  providers: [FairService],
  exports: [FairService]
})

export class FairModule{}