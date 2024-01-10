import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LandingImagesDocument = HydratedDocument<LandingImages>

@Schema()
export class LandingImages {

  @Prop({ type: [String], required: true })
  links: string[];
  
}

export const LandingImagesSchema = SchemaFactory.createForClass(LandingImages);