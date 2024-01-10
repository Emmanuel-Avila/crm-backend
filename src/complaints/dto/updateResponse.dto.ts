import { IsString } from "class-validator";

export class UpdateResponseDto {

  @IsString()
  id:string

  @IsString()
  text: string
}