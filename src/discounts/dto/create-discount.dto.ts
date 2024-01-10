import{
  IsString,
  IsDateString,

} from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  image: string;

  @IsDateString()
  date: string;

  @IsString()
  category: string;

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
