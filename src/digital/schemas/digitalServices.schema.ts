import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DigitalServicesDocument = HydratedDocument<DigitalServices>

export class DigitalType {
  button1: string;
  button2: string;
  text: string;
  image: string;
}

@Schema()
export class DigitalServices{

  @Prop({ type: [{ 
    button1: String,
    button2: String,
    text: String,
    image: String,
  }] })
  services: DigitalType[]

}

export const DigitalServicesSchema = SchemaFactory.createForClass(DigitalServices);