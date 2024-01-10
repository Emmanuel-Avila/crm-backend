import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CovenantDocument = HydratedDocument<Covenant>

@Schema()
export class Covenant{
  @Prop({required:true})
  title: string;

  @Prop({required:true})
  body:string;

  @Prop({required: true})
  image: string;
  
  @Prop({ required:true })
  office: string;
  
  @Prop({required:true})
  date: string;
  
  @Prop({ required:true })
  question: string;

  @Prop({ required:true })
  phone: string;

  @Prop({ required:true })
  email: string;

  @Prop({ required:true })
  webpage: string;

  @Prop({ required:true })
  terms: string;

  @Prop({ required:true })
  location: string;
}

export const CovenantSchema = SchemaFactory.createForClass(Covenant);