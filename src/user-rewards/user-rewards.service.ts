import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  RewardsLedger,
  RewardsLedgerDocument,
} from './schemas/rewards-ledger.schema';
import { Model } from 'mongoose';
import { CreditRewardsDto } from './dtos/credit-rewards.dto';
import { UserReward, UserRewardDocument } from './schemas/user-reward.schema';

@Injectable()
export class UserRewardsService {
  constructor(
    @InjectModel(RewardsLedger.name)
    private readonly rewardsLedgeModel: Model<RewardsLedgerDocument>,
    @InjectModel(UserReward.name)
    private readonly userRewardModel: Model<UserRewardDocument>,
  ) {}

  async creditRewards(creditRewardsDto: CreditRewardsDto, tenantId: string) {
    const creditedReward = await this.rewardsLedgeModel.create(
      new RewardsLedger(creditRewardsDto, tenantId),
    );
    const userReward = await this.userRewardModel
      .findOne({
        tenant: tenantId,
        userId: creditRewardsDto.userId,
      })
      .exec();
    if (userReward) {
      userReward.creditUserReward(creditRewardsDto.rewardValue);
      await this.userRewardModel.updateOne(
        {
          tenant: tenantId,
          userId: creditRewardsDto.userId,
        },
        userReward,
      );
    } else {
      await this.userRewardModel.create(
        new UserReward(creditRewardsDto, tenantId),
      );
    }
    return creditedReward;
  }
}
