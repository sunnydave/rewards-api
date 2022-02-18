import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  RewardsLedger,
  RewardsLedgerDocument,
} from './schemas/rewards-ledger.schema';
import { Model } from 'mongoose';
import { CreditRewardsDto } from './dtos/credit-rewards.dto';

@Injectable()
export class UserRewardsService {
  constructor(
    @InjectModel(RewardsLedger.name)
    private readonly rewardsLedgeModel: Model<RewardsLedgerDocument>,
  ) {}

  async creditRewards(creditRewardsDto: CreditRewardsDto, tenantId: string) {
    const creditedReward = await this.rewardsLedgeModel.create(
      new RewardsLedger(creditRewardsDto, tenantId),
    );
    return creditedReward;
  }
}
