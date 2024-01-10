import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "src/users/users.module";
import { SocialPrevisionController } from "./socialPrevision.controller";
import { SocialPrevisionService } from "./socialPrevision.service";
import { SocialPrevisionSchema, SocialPrevision } from "./schemas/socialPrevision.schema";

@Module({
  imports:[MongooseModule.forFeature([{name: SocialPrevision.name, schema: SocialPrevisionSchema}]), UsersModule],
  controllers: [SocialPrevisionController],
  providers: [SocialPrevisionService],
  exports: [SocialPrevisionService]
})
export class SocialPrevisionModule{}