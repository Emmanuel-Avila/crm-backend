import { IsString } from 'class-validator';


export class UsDto {
  @IsString()
  mission: string;

  @IsString()
  vission: string;

  @IsString()
  educationComittePresident: string;

  @IsString()
  educationComitteSecretary: string;

  @IsString()
  educationComitteVice: string;

  @IsString()
  educationComitteVocal: string;

  @IsString()
  electoralComittePresident:string;

  @IsString()
  electoralComitteSecretary:string;

  @IsString()
  electoralComitteVice:string;

  @IsString()
  electoralComitteVocal:string;

  @IsString()
  administracionCouncelPresident:string;

  @IsString()
  administracionCouncelSecretary:string;

  @IsString()
  administracionCouncelVice:string;

  @IsString()
  administracionCouncelVocal:string;

  @IsString()
  administracionCouncel2Vocal: string;

  @IsString()
  administracionCouncel3Vocal:string;

  @IsString()
  vigilanceCouncelPresident:string;

  @IsString()
  vigilanceCouncelSecretary:string;

  @IsString()
  vigilanceCouncelVice: string;

  @IsString()
  vigilanceCouncelVocal:string;

}
