import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type FairDocument = HydratedDocument<Fair>

@Schema()
export class Fair{

  @Prop({required: true})
  image: string

  @Prop({required: true})
  text: string

  @Prop({required: true})
  title: string

}

export const FairSchema = SchemaFactory.createForClass(Fair);