import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
} from 'class-validator';
import { RewardRuleDto } from '../../tenant/dto/reward-rule.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RewardConfigurationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly name: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly ruleExpiry: Date;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: [RewardRuleDto],
  })
  readonly rules: Array<RewardRuleDto>;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  readonly rewardExpiryType: string;

  @IsDate()
  @ApiProperty({
    required: false,
    type: Date,
  })
  readonly rewardExpiryDate: Date;

  @IsNumber()
  @ApiProperty({
    required: false,
  })
  readonly rewardExpiryDays: number;

  @IsString()
  @ApiProperty({
    required: false,
  })
  readonly rewardPointMultiplicationMeasure: string;

  @IsNumber()
  @ApiProperty({
    required: false,
  })
  readonly rewardPoints: number;

  tenant = '';
}
