import { Tenant } from '../../tenant/schemas/tenant.schema';
import { RewardRule } from '../../reward-configuration/schemas/reward-rule.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { isNumber } from 'class-validator';

export class PercentDiscount {
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
  percentDiscount: number;

  @Prop({
    required: true,
  })
  measureForPercent: string;

  @Prop()
  maxDiscountValue: number;
}

export const PercentDiscountSchema =
  SchemaFactory.createForClass(PercentDiscount);
PercentDiscountSchema.methods.redeemRewardValue = function (transaction: any) {
  if (transaction && transaction['measureForPercent']) {
    const measureValue = transaction['measureForPercent'];
    if (isNumber(measureValue)) {
      const discountValue = measureValue * (this.percentDiscount / 100);
      if (discountValue > this.maxDiscountValue) {
        return this.maxDiscountValue;
      } else {
        return this.discountValue;
      }
    }
  }
  return 0;
};
