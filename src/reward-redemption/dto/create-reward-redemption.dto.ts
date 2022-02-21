import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { RewardRuleDto } from '../../tenant/dto/reward-rule.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRewardRedemptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  name: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  expiry: Date;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: [RewardRuleDto],
  })
  rules: Array<RewardRuleDto>;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  discountType: string;

  @IsNumber()
  @ApiProperty({
    required: false,
  })
  discountValue: number;

  @IsNumber()
  @ApiProperty({
    required: false,
  })
  percentDiscount: number;

  @IsString()
  @ApiProperty({
    required: false,
  })
  measureForPercent: string;

  @IsNumber()
  @ApiProperty({
    required: false,
  })
  maxDiscountValue: number;

  @IsNumber()
  @ApiProperty({
    required: false,
  })
  requiredRewardPoints: number;

  tenant = '';
}
