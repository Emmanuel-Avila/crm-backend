import { IsString } from "class-validator";

export class FairDto{

  @IsString()
  image: string

  @IsString()
  title: string

  @IsString()
  text: string
}