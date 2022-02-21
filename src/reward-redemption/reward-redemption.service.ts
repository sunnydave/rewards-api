import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  RewardRedemption,
  RewardRedemptionDocument,
} from './schemas/reward-redemption.schema';
import { Model } from 'mongoose';
import { UserRewardsService } from '../user-rewards/user-rewards.service';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import { DebitRewardDto } from '../user-rewards/dtos/debit-reward.dto';

@Injectable()
export class RewardRedemptionService {
  constructor(
    @InjectModel(RewardRedemption.name)
    private readonly rewardRedemptionModel: Model<RewardRedemptionDocument>,
    private readonly userRewardsService: UserRewardsService,
  ) {}

  async createRewardRedemptionConfig(
    createRewardRedemptionDto,
  ): Promise<RewardRedemption> {
    const createdRewardRedemption = await this.rewardRedemptionModel.create(
      createRewardRedemptionDto,
    );
    return createdRewardRedemption;
  }

  async getAllApplicableRewards(
    redeemRewardDto: RedeemRewardDto,
    tenantId: string,
  ): Promise<Array<RewardRedemption>> {
    const rewardRedemptionRules = await this.rewardRedemptionModel.find({
      tenant: tenantId,
      active: true,
    });
    const userRewards =
      await this.userRewardsService.getUserCurrentRewardPoints(
        tenantId,
        redeemRewardDto.userId,
      );
    if (rewardRedemptionRules && rewardRedemptionRules.length > 0) {
      const applicableRules = [];
      for (const rewardRedemptionRule of rewardRedemptionRules) {
        if (
          rewardRedemptionRule.isRewardApplicable(
            redeemRewardDto.transaction,
            userRewards,
          )
        ) {
          applicableRules.push(rewardRedemptionRule);
        }
      }
      return applicableRules;
    } else {
      return [];
    }
  }

  async redeemReward(
    redeemRewardDto: RedeemRewardDto,
    tenantId: string,
    redemptionId: string,
  ): Promise<boolean> {
    const rewardRedemptionRule = await this.rewardRedemptionModel
      .findOne({
        tenant: tenantId,
        _id: redemptionId,
      })
      .exec();
    if (rewardRedemptionRule) {
      const userRewards =
        await this.userRewardsService.getUserCurrentRewardPoints(
          tenantId,
          redeemRewardDto.userId,
        );
      if (
        rewardRedemptionRule.isRewardApplicable(
          redeemRewardDto.transaction,
          userRewards,
        )
      ) {
        console.debug(rewardRedemptionRule);
        const rewardValue = rewardRedemptionRule.redeemRewardValue(
          redeemRewardDto.transaction,
        );
        return await this.userRewardsService.debitRewards(
          new DebitRewardDto(redeemRewardDto, rewardValue),
          tenantId,
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
