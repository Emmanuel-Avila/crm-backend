import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TrainingDocument = HydratedDocument<Training>

@Schema()
export class Training{

  @Prop({required: true})
  image: string

  @Prop({required: true})
  text: string

  @Prop({required: true})
  title: string

}

export const TrainingSchema = SchemaFactory.createForClass(Training);