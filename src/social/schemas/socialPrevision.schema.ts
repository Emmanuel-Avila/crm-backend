import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type SocialPrevisionDocument = HydratedDocument<SocialPrevision>

@Schema()
export class SocialPrevision{

  @Prop({required: true})
  image: string

  @Prop({required: true})
  text: string

  @Prop({required: true})
  title: string

}

export const SocialPrevisionSchema = SchemaFactory.createForClass(SocialPrevision);