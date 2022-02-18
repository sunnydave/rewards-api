import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  RewardConfiguration,
  RewardConfigurationDocument,
} from './schemas/reward-configuration.schema';
import { Model } from 'mongoose';
import { ApplyRewardDto } from './dto/apply-reward.dto';
import { CreditRewardsDto } from '../user-rewards/dtos/credit-rewards.dto';
import { UserRewardsService } from '../user-rewards/user-rewards.service';

@Injectable()
export class RewardConfigurationService {
  constructor(
    @InjectModel(RewardConfiguration.name)
    private readonly rewardConfigurationModel: Model<RewardConfigurationDocument>,
    private readonly userRewardsService: UserRewardsService,
  ) {}

  async saveRewardConfiguration(
    createRewardConfiguration,
  ): Promise<RewardConfiguration> {
    const createdRewardConfiguration =
      await this.rewardConfigurationModel.create(createRewardConfiguration);
    return createdRewardConfiguration;
  }

  async getAllRewardConfigurations(
    tenantId: string,
  ): Promise<RewardConfiguration[]> {
    const rewards = await this.rewardConfigurationModel.find({
      tenant: tenantId,
    });
    return rewards;
  }

  async applyReward(
    tenantId: string,
    applyRewardDto: ApplyRewardDto,
  ): Promise<boolean> {
    const rewards = await this.getAllRewardConfigurations(tenantId);
    let validRewardConfiguration: RewardConfiguration = null;
    if (rewards && rewards.length > 0) {
      for (const reward of rewards) {
        if (reward.isConfigurationApplicable(applyRewardDto.transaction)) {
          validRewardConfiguration = reward;
          break;
        }
      }
      const creditRewardsDto = new CreditRewardsDto(
        applyRewardDto,
        validRewardConfiguration.rewardValue(applyRewardDto.transaction),
        validRewardConfiguration.getRewardExpiryDate(),
      );
      const creditedReward = await this.userRewardsService.creditRewards(
        creditRewardsDto,
        tenantId,
      );
      return true;
    }
    return;
  }
}
