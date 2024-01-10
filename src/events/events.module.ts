import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "src/users/users.module";
import { EventService } from "./events.service";
import { EventController } from "./events.controller";
import { EventSchema, Event } from "./schemas/events.schema";

@Module({
  imports: [MongooseModule.forFeature([{name:Event.name, schema: EventSchema}]), UsersModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService]
})
export class EventModule {}