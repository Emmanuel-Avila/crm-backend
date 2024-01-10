import { IsString } from "class-validator";

export class UpdateComplainDto {

  @IsString()
  id:string

  @IsString()
  action:string

  @IsString()
  state: string
}