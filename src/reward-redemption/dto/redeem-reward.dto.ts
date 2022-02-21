import { IsObject, IsString } from 'class-validator';

export class RedeemRewardDto {
  @IsObject()
  transaction: any;

  @IsString()
  userId: string;

  @IsObject()
  userMeta: any;
}
