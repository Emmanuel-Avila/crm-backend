import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type AccountsDocument = HydratedDocument<Accounts>



@Schema()
export class Accounts{

  @Prop({required: true})
  identifier: string

  @Prop({required: true})
  name: string

  @Prop({required: true})
  title: string

  @Prop({required: true})
  description: string

  @Prop({required: true})
  accounts: object[]


}

export const AccountsSchema = SchemaFactory.createForClass(Accounts);