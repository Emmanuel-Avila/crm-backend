import { IsString } from "class-validator";

export class HealthCampaignDto{

  @IsString()
  image: string

  @IsString()
  title: string

  @IsString()
  text: string
}