import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export interface Document {
  name: string;
  link: string;
}

export type TransparencyDocument = HydratedDocument<Transparency>

@Schema()
export class Transparency{

  @Prop({required:true})
  clients: Object[];

  @Prop({required: true})
  institutional: Object[];

  @Prop({required: true})
  documents: Document[];

}

export const TransparencySchema = SchemaFactory.createForClass(Transparency);