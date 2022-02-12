import {IsEmail, IsString} from 'class-validator';

export class CreateTenantDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;
}
