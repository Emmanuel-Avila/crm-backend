import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type HealthDocument = HydratedDocument<Health>

@Schema()
export class Health{

  @Prop({required: true})
  image: string

  @Prop({required: true})
  text: string

  @Prop({required: true})
  title: string

}

export const HealthSchema = SchemaFactory.createForClass(Health);