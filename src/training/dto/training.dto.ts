import { IsString } from "class-validator";

export class TrainingDto{

  @IsString()
  image: string

  @IsString()
  title: string

  @IsString()
  text: string
}