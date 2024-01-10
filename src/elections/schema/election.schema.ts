import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export interface Document {
  name: string;
  link: string;
}

export type ElectionDocument = HydratedDocument<Election>

@Schema()
export class Election{
  @Prop({required:true})
  image: string;

  @Prop({required: true})
  documents: Document[];

}

export const ElectionSchema = SchemaFactory.createForClass(Election);