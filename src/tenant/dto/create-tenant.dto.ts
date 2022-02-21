import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly email: string;
}
