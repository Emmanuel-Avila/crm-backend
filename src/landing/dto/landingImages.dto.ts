import { IsArray, IsString } from 'class-validator';

export class LandingImagesDto {
  
  @IsArray()
  @IsString({ each: true })
  links: string[];

}