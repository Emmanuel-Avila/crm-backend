import { IsArray } from "class-validator";
import { OfficeType } from "../schemas/office.schema";


export class OfficeDto {
  @IsArray()
  offices: OfficeType[]
}