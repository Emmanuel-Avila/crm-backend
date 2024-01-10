import{
  IsString,
  IsDateString,

} from 'class-validator';

export class CreateCovenantDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  image: string;

  @IsDateString()
  date: string;

  @IsString()
  office: string;

  @IsString()
  question: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  location: string;

  @IsString()
  webpage: string;

  @IsString()
  terms: string;

}
