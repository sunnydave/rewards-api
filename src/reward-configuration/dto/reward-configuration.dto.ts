import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
} from 'class-validator';
import { RewardRule } from '../schemas/reward-rule.schema';

export class RewardConfigurationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDate()
  @IsNotEmpty()
  readonly ruleExpiry: Date;

  @IsArray()
  readonly rules: Array<RewardRule>;

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
