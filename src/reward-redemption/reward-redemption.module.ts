import { Module } from '@nestjs/common';
import { RewardRedemptionService } from './reward-redemption.service';
import { RewardRedemptionController } from './reward-redemption.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RewardRedemption,
  RewardRedemptionSchema,
} from './schemas/reward-redemption.schema';
import {
  FixedDiscount,
  FixedDiscountSchema,
} from './schemas/fixed-discount.schema';
import {
  PercentDiscount,
  PercentDiscountSchema,
} from './schemas/percent-discount.schema';
import { UserRewardsModule } from '../user-rewards/user-rewards.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RewardRedemption.name,
        schema: RewardRedemptionSchema,
        discriminators: [
          { name: FixedDiscount.name, schema: FixedDiscountSchema },
          { name: PercentDiscount.name, schema: PercentDiscountSchema },
        ],
      },
    ]),
    UserRewardsModule,
  ],
  providers: [RewardRedemptionService],
  controllers: [RewardRedemptionController],
})
export class RewardRedemptionModule {}
