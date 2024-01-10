import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ResponsesDocument = HydratedDocument<Responses>


@Schema()
export class Responses{
  @Prop({required: true})
  text: string
}

export const ResponsesSchema = SchemaFactory.createForClass(Responses);