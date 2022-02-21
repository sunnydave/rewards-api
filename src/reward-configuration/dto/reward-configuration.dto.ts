import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
} from 'class-validator';
import { RewardRuleDto } from '../../tenant/dto/reward-rule.dto';

export class RewardConfigurationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDate()
  @IsNotEmpty()
  readonly ruleExpiry: Date;

  @IsArray()
  readonly rules: Array<RewardRuleDto>;

  @IsString()
  @IsNotEmpty()
  readonly rewardExpiryType: string;

  @IsDate()
  readonly rewardExpiryDate: Date;

  @IsNumber()
  readonly rewardExpiryDays: number;

  @IsString()
  readonly rewardPointMultiplicationMeasure: string;

  @IsNumber()
  readonly rewardPoints: number;

  tenant = '';
}
