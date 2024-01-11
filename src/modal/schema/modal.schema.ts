import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ModalDocument = HydratedDocument<Modal>

@Schema()
export class Modal {

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  link: string;
  
}

export const ModalSchema = SchemaFactory.createForClass(Modal);