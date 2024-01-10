import { IsString, IsArray, ArrayMinSize, IsObject, IsNumber, IsOptional, ValidateIf } from "class-validator";
import { Transform, Type } from "class-transformer";

export class ProductDto{

  @IsString()
  name: string;

  @IsArray()
  @IsString({each: true})
  @ArrayMinSize(1)
  benefits: string[];

  @IsArray()
  @IsString({each: true})
  @ArrayMinSize(1)
  requirements: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  documentNames: string[];


  @Transform(({ value }) => JSON.parse(value))
  @IsNumber({}, { each: true })
  addIndexs: number[];

  @IsString()
  details: string;

}