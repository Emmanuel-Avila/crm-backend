import { IsString, IsArray, ArrayMinSize, IsObject, IsNumber, IsOptional, ValidateIf } from "class-validator";
import { Transform, Type } from "class-transformer";

export class TransparencyDto{

  @IsArray()
  @IsString({ each: true })
  clientsText: string[];

  @IsArray()
  @IsString({ each: true })
  clientsName: string[];

  @IsArray()
  @IsString({ each: true })
  institutionalText: string[];

  @IsArray()
  @IsString({ each: true })
  institutionalName: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  documentNames: string[];

  @Transform(({ value }) => JSON.parse(value))
  @IsNumber({}, { each: true })
  addIndexs: number[];

}