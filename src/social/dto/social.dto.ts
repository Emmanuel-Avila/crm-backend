import { IsString } from "class-validator";

export class SocialPrevisionDto{

  @IsString()
  image: string

  @IsString()
  title: string

  @IsString()
  text: string
}