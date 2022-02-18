import { IsNumber, IsString } from 'class-validator';

export class RewardRuleDto {
  @IsString()
  measure: string;

  @IsNumber()
  measureValue: number;

  @IsString()
  measureComparator: string;
}
