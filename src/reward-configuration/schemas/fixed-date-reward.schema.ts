import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tenant } from '../../tenant/schemas/tenant.schema';
import { RewardRule } from './reward-rule.schema';

@Schema()
export class FixedDateReward {
  tenant: Tenant;
  active: boolean;
  name: string;
  ruleExpiry: Date;
  rewardExpiryType: string;
  rules: Array<RewardRule>;
  getRewardExpiryDate!: () => Date;

  @Prop({ required: true })
  rewardExpiryDate: Date;
}

export const FixedDateRewardSchema =
  SchemaFactory.createForClass(FixedDateReward);

FixedDateRewardSchema.methods.getRewardExpiryDate = function () {
  return this.rewardExpiryDate;
};
