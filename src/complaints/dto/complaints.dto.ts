import { IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class ComplaintDto {

  @IsString()
  names: string

  @IsString()
  surnames: string

  @IsString()
  @IsOptional()
  department: string

  @IsString()
  @IsOptional()
  province: string

  @IsString()
  @IsOptional()
  district: string

  @IsString()
  @IsOptional()
  phone: string

  @IsString()
  email: string

  @IsString()
  documentType: string
  
  @IsString()
  documentValue: string

  @IsString()
  @IsOptional()
  child: string

  @IsString()
  complaintType: string

  @IsString()
  @IsOptional()
  office: string

  @IsString()
  @IsOptional()
  productType: string

  @IsString()
  @IsOptional()
  contractedProduct: string

  @IsString()
  @IsOptional()
  divisa: string

  @Type(()=> Number)
  @IsOptional()
  amount: number

  @IsString()
  @IsOptional()
  incidentDate: string

  @IsString()
  @IsOptional()
  incidentTime: string

  @IsString()
  @IsOptional()
  details: string

  @IsString()
  request: string

  @IsString()
  @IsOptional()
  notificationType: string

  @IsString()
  token: string

  @Type(()=> Date)
  sentDate: Date

}