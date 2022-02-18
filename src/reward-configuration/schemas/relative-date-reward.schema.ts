import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tenant } from '../../tenant/schemas/tenant.schema';
import { RewardRule } from './reward-rule.schema';

@Schema()
export class RelativeDateReward {
  tenant: Tenant;
  active: boolean;
  name: string;
  ruleExpiry: Date;
  rewardExpiryType: string;
  rules: Array<RewardRule>;
  getRewardExpiryDate!: () => Date;

  @Prop({ required: true })
  rewardExpiryDays: number;
}

export const RelativeDateRewardSchema =
  SchemaFactory.createForClass(RelativeDateReward);

RelativeDateRewardSchema.methods.getRewardExpiryDate = function () {
  const todayDate = new Date();
  const rewardExpiry = todayDate.setDate(
    todayDate.getDate() + this.rewardExpiryDays,
  );
  return rewardExpiry;
};
