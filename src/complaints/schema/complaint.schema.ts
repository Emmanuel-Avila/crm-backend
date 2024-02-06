import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Comments, CommentsSchema } from './comment.schema';


export type ComplaintsDocument = HydratedDocument<Complaints>



@Schema()
export class Complaints{

  @Prop({required: true})
  names: string

  @Prop({required: true})
  surnames: string

  @Prop({required: true})
  address: string

  @Prop({required: true})
  code: string

  @Prop({required: true})
  department: string

  @Prop({required: true})
  province: string

  @Prop({required: true})
  district: string

  @Prop({required: true})
  phone: string

  @Prop({required: true})
  email: string

  @Prop({required: true})
  documentType: string
  
  @Prop({required: true})
  documentValue: string

  @Prop({required: true, default: 'NO'})
  isChild: string

  @Prop({required: true})
  complaintType: string

  @Prop({required: true})
  office: string

  @Prop({required: true})
  productType: string

  @Prop({required: true})
  contractedProduct: string

  @Prop({required: true})
  divisa: string

  @Prop({required: true})
  amount: number

  @Prop({required: false, type: Date, default: null})
  incidentDate: Date

  @Prop({required: false, type: Date, default: null})
  responseDate: Date

  @Prop({required: true})
  incidentTime: string

  @Prop({required: true})
  details: string

  @Prop({required: true})
  request: string

  @Prop({required: true})
  notificationType: string

  @Prop({required: true})
  documents:string[]

  @Prop({required: true})
  sentDate: Date

  @Prop({required: true})
  state: string

  @Prop({required: true})
  action: string

  @Prop({required: true, ref:'Comments', type: Types.ObjectId})
  comments: Types.ObjectId

}

export const ComplaintsSchema = SchemaFactory.createForClass(Complaints);