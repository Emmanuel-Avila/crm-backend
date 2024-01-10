import { IsArray } from "class-validator";
import { DigitalType } from "../schemas/digitalServices.schema";


export class DigitalServicesDto{

  @IsArray()
  services: DigitalType[];

}