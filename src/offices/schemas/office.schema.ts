import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OfficesDocument = HydratedDocument<Offices>

export class OfficeType {
  name: string;
  location: string;
  phone: string;
  locationLink: string;
}

@Schema()
export class Offices{

  @Prop({ type: [{ 
    name: String,
    location: String,
    phone: String,
    locationLink: String,
  }] })
  offices: OfficeType[]

}

export const OfficesSchema = SchemaFactory.createForClass(Offices);