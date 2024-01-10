import { IsString } from "class-validator";

export class EventDto{

  @IsString()
  image: string

  @IsString()
  title: string

  @IsString()
  text: string
}