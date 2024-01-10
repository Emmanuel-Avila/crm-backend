import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export interface Document {
  name: string;
  link: string;
}

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product{
  @Prop({required:true})
  name: string;

  @Prop({required:true})
  benefits: string[];

  @Prop({required: true})
  requirements: string[];

  @Prop({required: true})
  details: string;

  @Prop({required: true})
  documents: Document[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);