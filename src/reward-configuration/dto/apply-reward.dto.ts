import { IsObject, IsString } from 'class-validator';

export class ApplyRewardDto {
  @IsObject()
  readonly transaction: any;

  @IsString()
  readonly userId: string;

  @IsObject()
  readonly userMeta: any;
}
