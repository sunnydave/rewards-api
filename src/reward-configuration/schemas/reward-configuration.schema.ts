import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tenant } from '../../tenant/schemas/tenant.schema';
import { FixedDateReward } from './fixed-date-reward.schema';
import { RelativeDateReward } from './relative-date-reward.schema';
import { RewardRule, RewardRuleSchema } from './reward-rule.schema';
import { isNumber } from '@nestjs/common/utils/shared.utils';

export type RewardConfigurationDocument = RewardConfiguration & Document;

@Schema({
  timestamps: true,
  discriminatorKey: 'rewardExpiryType',
})
export class RewardConfiguration {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
  })
  tenant: Tenant;

  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ruleExpiry: Date;

  @Prop({ type: [RewardRuleSchema], required: true })
  rules: Array<RewardRule>;

  @Prop()
  rewardPointMultiplicationMeasure: string;

  @Prop({ required: true })
  rewardPoints: number;

  @Prop({
    type: String,
    required: true,
    enum: [FixedDateReward.name, RelativeDateReward.name],
  })
  rewardExpiryType: string;

  isConfigurationApplicable!: (transaction: any) => boolean;

  rewardValue!: (transaction: any) => number;

  getRewardExpiryDate!: () => Date;
}

export const RewardConfigurationSchema =
  SchemaFactory.createForClass(RewardConfiguration);

RewardConfigurationSchema.methods.isConfigurationApplicable = function (
  transaction: any,
) {
  let isApplicable = true;
  for (const rule of this.rules) {
    if (!rule.isRuleApplicable(transaction)) {
      isApplicable = false;
      break;
    }
  }
  return isApplicable;
};

RewardConfigurationSchema.methods.rewardValue = function (transaction: any) {
  let rewardMultiplicationMeasureValue = 1;
  if (transaction && transaction[this.rewardPointMultiplicationMeasure]) {
    rewardMultiplicationMeasureValue =
      transaction[this.rewardPointMultiplicationMeasure];
    if (!isNumber(rewardMultiplicationMeasureValue)) {
      rewardMultiplicationMeasureValue = 1;
    }
  }
  return rewardMultiplicationMeasureValue * this.rewardPoints;
};
