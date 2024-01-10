import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UsDocument = HydratedDocument<Us>

@Schema({_id: false})
export class CommitteeMembers {
  @Prop({ required: true })
  president: string;

  @Prop({ required: true })
  secretary: string;

  @Prop({ required: true })
  vicepresident: string;

  @Prop({ required: true })
  vocal: string;
}

@Schema({_id: false})
export class AdministrationMembers {
  @Prop({ required: true })
  president: string;

  @Prop({ required: true })
  secretary: string;

  @Prop({ required: true })
  vicepresident: string;

  @Prop({ required: true })
  firstVocal: string;
  
  @Prop({ required: true })
  secondVocal: string;

  @Prop({ required: true })
  thirdVocal: string;
}

@Schema()
export class Us{
  @Prop({ required: true })
  mission: string;

  @Prop({ required: true })
  vission: string;

  @Prop({ type: CommitteeMembers, required: true })
  educationCommitte: CommitteeMembers;

  @Prop({ type: CommitteeMembers, required: true })
  electoralCommitte: CommitteeMembers;

  @Prop({ type: AdministrationMembers, required: true })
  administracionCouncel: AdministrationMembers

  @Prop({ type: CommitteeMembers, required: true })
  vigilanceCouncel: CommitteeMembers;

}

export const UsSchema = SchemaFactory.createForClass(Us);