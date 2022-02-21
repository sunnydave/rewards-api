import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  RewardsLedger,
  RewardsLedgerDocument,
} from './schemas/rewards-ledger.schema';
import { Model } from 'mongoose';
import { CreditRewardsDto } from './dtos/credit-rewards.dto';
import { UserReward, UserRewardDocument } from './schemas/user-reward.schema';
import { DebitRewardDto } from './dtos/debit-reward.dto';
import { exec } from 'child_process';

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

  async getUserCurrentRewardPoints(
    tenantId: string,
    userId: string,
  ): Promise<number> {
    const userReward = await this.userRewardModel.findOne({
      tenantId: tenantId,
      userId: userId,
    });
    if (userReward) {
      return userReward.currentRewardValue;
    } else {
      return 0;
    }
  }

  async debitRewards(debitRewardsDto: DebitRewardDto, tenantId: string) {
    const todayDate = new Date();
    const creditRewardsToBeRedeemed = await this.rewardsLedgeModel
      .find({
        tenant: tenantId,
        userId: debitRewardsDto.userId,
        currentRewardPoints: { $gt: 0 },
        expiryDate: { $gt: todayDate },
      })
      .sort({
        expiryDate: 1,
      })
      .exec();

    if (creditRewardsToBeRedeemed) {
      let debitAmount = debitRewardsDto.rewardValue;
      for (const creditReward of creditRewardsToBeRedeemed) {
        if (creditReward.currentRewardPoints > debitAmount) {
          const newCurrentRewardPoint =
            creditReward.currentRewardPoints - debitAmount;
          debitAmount -= creditReward.currentRewardPoints;
          await this.rewardsLedgeModel.updateOne(
            {
              _id: creditReward._id,
            },
            {
              currentRewardPoints: newCurrentRewardPoint,
            },
          );
        } else if (creditReward.currentRewardPoints < debitAmount) {
          debitAmount -= creditReward.currentRewardPoints;
          await this.rewardsLedgeModel.updateOne(
            {
              _id: creditReward._id,
            },
            {
              currentRewardPoints: 0,
            },
          );
        } else {
          debitAmount = 0;
          await this.rewardsLedgeModel.updateOne(
            {
              _id: creditReward._id,
            },
            {
              currentRewardPoints: 0,
            },
          );
        }

        if (debitAmount === 0) {
          break;
        }
      }
      await this.rewardsLedgeModel.create(
        new RewardsLedger(debitRewardsDto, tenantId),
      );
      const userReward = await this.userRewardModel
        .findOne({
          tenant: tenantId,
          userId: debitRewardsDto.userId,
        })
        .exec();
      if (userReward) {
        userReward.debitUserReward(debitRewardsDto.rewardValue);
        await this.userRewardModel.updateOne(
          {
            _id: userReward._id,
          },
          userReward,
        );
      }
      return true;
    } else {
      return false;
    }
  }
}
