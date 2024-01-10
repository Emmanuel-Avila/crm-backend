import { IsString } from "class-validator";

export class UpdateCommentDto {

  @IsString()
  commentId:string

  @IsString()
  text:string

  @IsString()
  email:string

  @IsString()
  complaintCode: string

  @IsString()
  clientNames: string

  @IsString()
  responseDate: string
}