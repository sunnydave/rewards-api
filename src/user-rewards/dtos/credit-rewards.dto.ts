import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import { ApplyRewardDto } from '../../reward-configuration/dto/apply-reward.dto';

export class CreditRewardsDto {
  @IsString()
  readonly userId: string;

  @IsNumber()
  readonly rewardValue: number;

  @IsDate()
  readonly expiryDate: Date;

  @IsObject()
  readonly transactionMeta: any;

  @IsObject()
  readonly userMeta: any;

  constructor(applyRewardsDto: ApplyRewardDto, rewardValue, expiryDate) {
    this.userId = applyRewardsDto.userId;
    this.rewardValue = rewardValue;
    this.expiryDate = expiryDate;
    this.transactionMeta = applyRewardsDto.transaction;
    this.userMeta = applyRewardsDto.userMeta;
  }
}
