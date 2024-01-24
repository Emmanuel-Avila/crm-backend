import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LandingImagesDocument = HydratedDocument<LandingImages>

@Schema()
export class LandingImages {

  @Prop({ type: [String], required: true })
  links: string[];

  @Prop({ type: [String], required: true })
  redirections: string[];
  
}

export const LandingImagesSchema = SchemaFactory.createForClass(LandingImages);