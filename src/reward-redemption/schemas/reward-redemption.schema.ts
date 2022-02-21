import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tenant } from '../../tenant/schemas/tenant.schema';
import {
  RewardRule,
  RewardRuleSchema,
} from '../../reward-configuration/schemas/reward-rule.schema';
import { FixedDiscount } from './fixed-discount.schema';
import { PercentDiscount } from './percent-discount.schema';
import { rules } from '@typescript-eslint/eslint-plugin';

export type RewardRedemptionDocument = RewardRedemption & Document;

@Schema({
  timestamps: true,
  discriminatorKey: 'discountType',
})
export class RewardRedemption {
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
  expiry: Date;

  @Prop({ type: [RewardRuleSchema], required: true })
  rules: Array<RewardRule>;

  @Prop()
  requiredRewardPoints: number;

  @Prop({
    type: String,
    required: true,
    enum: [FixedDiscount.name, PercentDiscount.name],
  })
  discountType: string;

  isRewardApplicable!: (transaction: any, userRewards: number) => boolean;
  redeemRewardValue!: (transaction: any) => number;
}

export const RewardRedemptionSchema =
  SchemaFactory.createForClass(RewardRedemption);

RewardRedemptionSchema.methods.isRewardApplicable = function (
  transaction: any,
  userRewards: number,
) {
  let isApplicable = true;
  if (this.rules && this.rules.length > 0) {
    for (const rule of this.rules) {
      if (!rule.isRuleApplicable(transaction)) {
        isApplicable = false;
        break;
      }
    }
    if (userRewards < this.requiredRewardPoints) {
      isApplicable = false;
    }
  } else {
    isApplicable = false;
  }
  return isApplicable;
};
