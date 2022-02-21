import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { RewardRule } from '../../reward-configuration/schemas/reward-rule.schema';
import { RewardRuleDto } from '../../tenant/dto/reward-rule.dto';

export class CreateRewardRedemptionDto {
  @IsString()
  name: string;

  @IsDate()
  expiry: Date;

  @IsArray()
  rules: Array<RewardRuleDto>;

  @IsString()
  discountType: string;

  @IsNumber()
  discountValue: number;

  @IsNumber()
  percentDiscount: number;

  @IsString()
  measureForPercent: string;

  @IsNumber()
  maxDiscountValue: number;

  @IsNumber()
  requiredRewardPoints: number;

  tenant = '';
}
