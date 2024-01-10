import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type EventDocument = HydratedDocument<Event>

@Schema()
export class Event{

  @Prop({required: true})
  image: string

  @Prop({required: true})
  text: string

  @Prop({required: true})
  title: string

}

export const EventSchema = SchemaFactory.createForClass(Event);