import { IsNumber, IsObject, IsString } from 'class-validator';
import {RedeemRewardDto} from "../../reward-redemption/dto/redeem-reward.dto";

export class DebitRewardDto {
  @IsString()
  readonly userId: string;

  @IsNumber()
  readonly rewardValue: number;

  @IsObject()
  readonly transactionMeta: any;

  @IsObject()
  readonly userMeta: any;

  constructor(redeemRewardDto: RedeemRewardDto, rewardValue) {
    this.userId = redeemRewardDto.userId;
    this.transactionMeta = redeemRewardDto.transaction;
    this.userMeta = redeemRewardDto.userMeta;
    this.rewardValue = rewardValue;
  }
}
