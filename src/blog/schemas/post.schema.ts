import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>

@Schema()
export class Post{
  @Prop({required:true})
  title: string;

  @Prop({required:true})
  body:string;

  @Prop({required: true})
  image: string;

  @Prop({required:true})
  date: string;

  @Prop({ required:true })
  category: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);