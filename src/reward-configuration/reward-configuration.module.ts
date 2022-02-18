import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RewardConfiguration,
  RewardConfigurationSchema,
} from './schemas/reward-configuration.schema';
import {
  FixedDateReward,
  FixedDateRewardSchema,
} from './schemas/fixed-date-reward.schema';
import {
  RelativeDateReward,
  RelativeDateRewardSchema,
} from './schemas/relative-date-reward.schema';
import { RewardConfigurationController } from './reward-configuration.controller';
import { RewardConfigurationService } from './reward-configuration.service';
import { UserRewardsModule } from '../user-rewards/user-rewards.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RewardConfiguration.name,
        schema: RewardConfigurationSchema,
        discriminators: [
          { name: FixedDateReward.name, schema: FixedDateRewardSchema },
          { name: RelativeDateReward.name, schema: RelativeDateRewardSchema },
        ],
      },
    ]),
    UserRewardsModule,
  ],
  controllers: [RewardConfigurationController],
  providers: [RewardConfigurationService],
})
export class RewardConfigurationModule {}
