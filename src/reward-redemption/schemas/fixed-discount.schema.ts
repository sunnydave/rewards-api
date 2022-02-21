import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tenant } from '../../tenant/schemas/tenant.schema';
import { RewardRule } from '../../reward-configuration/schemas/reward-rule.schema';

@Schema()
export class FixedDiscount {
  tenant: Tenant;
  active: boolean;
  name: string;
  expiry: Date;
  rules: Array<RewardRule>;
  requiredRewardPoints: number;
  discountType: string;

  @Prop({
    required: true,
  })
  discountValue: number;
}

export const FixedDiscountSchema = SchemaFactory.createForClass(FixedDiscount);
FixedDiscountSchema.methods.redeemRewardValue = function (transaction: any) {
  return this.discountValue;
};
