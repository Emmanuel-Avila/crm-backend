import{
  IsString,
  IsDateString,

} from 'class-validator';

export class CreateBlogDto {
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

}
