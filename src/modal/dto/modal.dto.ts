import { IsString } from 'class-validator';

export class ModalDto {
  
  @IsString()
  link: string;

  @IsString()
  image: string;
}