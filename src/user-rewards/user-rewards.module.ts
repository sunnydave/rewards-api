import { Module } from '@nestjs/common';
import { UserRewardsService } from './user-rewards.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RewardsLedger,
  RewardsLedgerSchema,
} from './schemas/rewards-ledger.schema';
import { UserReward, UserRewardSchema} from "./schemas/user-reward.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardsLedger.name, schema: RewardsLedgerSchema },
      { name: UserReward.name, schema: UserRewardSchema },
    ]),
  ],
  exports: [UserRewardsService],
  providers: [UserRewardsService],
})
export class UserRewardsModule {}
