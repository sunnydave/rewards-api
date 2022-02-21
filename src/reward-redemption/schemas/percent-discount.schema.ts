import { Tenant } from '../../tenant/schemas/tenant.schema';
import { RewardRule } from '../../reward-configuration/schemas/reward-rule.schema';
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { isNumber } from 'class-validator';

@Schema()
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
  if (transaction && transaction[this.measureForPercent]) {
    const measureValue = transaction[this.measureForPercent];
    if (isNumber(measureValue)) {
      const discountValue = measureValue * (this.percentDiscount / 100);
      if (discountValue > this.maxDiscountValue) {
        return this.maxDiscountValue;
      } else {
        return discountValue;
      }
    }
  }
  return 0;
};
