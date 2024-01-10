import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CommentsDocument = HydratedDocument<Comments>


@Schema()
export class Comments{
  @Prop({required: true})
  messages: string[]

  @Prop({required: true})
  documents:string[]
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);