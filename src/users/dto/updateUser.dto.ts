import {   IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;
}
