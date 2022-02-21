import { IsNotEmpty, IsObject, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyRewardDto {
  @IsObject()
  @ApiProperty({
    required: true,
  })
  readonly transaction: any;

  @IsString()
  @ApiProperty({
    required: true,
  })
  readonly userId: string;

  @IsObject()
  @ApiProperty({
    required: false,
  })
  readonly userMeta: any;
}
