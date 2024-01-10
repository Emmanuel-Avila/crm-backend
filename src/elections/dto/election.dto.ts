import { IsString, IsArray, ArrayMinSize, IsObject, IsNumber, IsOptional, ValidateIf } from "class-validator";
import { Transform, Type } from "class-transformer";

export class ElectionDto{

  @IsString()
  image: string

  @IsArray()
  @IsString({ each: true })
  documentNames: string[];


  @IsNumber({}, { each: true })
  addIndexs: number[];

}