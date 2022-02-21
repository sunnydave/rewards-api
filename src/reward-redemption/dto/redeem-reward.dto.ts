import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RedeemRewardDto {
  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  transaction: any;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsObject()
  @ApiProperty()
  userMeta: any;
}
