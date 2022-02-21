import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RewardRuleDto {
  @IsString()
  @ApiProperty({
    required: true,
  })
  measure: string;

  @IsNumber()
  @ApiProperty({
    required: true,
  })
  measureValue: number;

  @IsString()
  @ApiProperty({
    required: true,
  })
  measureComparator: string;
}
