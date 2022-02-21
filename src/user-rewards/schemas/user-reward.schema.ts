import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tenant } from '../../tenant/schemas/tenant.schema';
import {CreditRewardsDto} from "../dto/credit-rewards.dto";

export type UserRewardDocument = UserReward & Document;

@Schema({
  timestamps: true,
})
export class UserReward {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
  })
  tenant: Tenant;

  @Prop()
  userId: string;

  @Prop()
  currentRewardValue: number;

  creditUserReward!: (creditAmount: number) => number;
  debitUserReward!: (debitAmount: number) => number;

  constructor(creditRewardsDto: CreditRewardsDto, tenantId) {
    this.tenant = tenantId;
    this.userId = creditRewardsDto.userId;
    this.currentRewardValue = creditRewardsDto.rewardValue;
  }
}

export const UserRewardSchema = SchemaFactory.createForClass(UserReward);
UserRewardSchema.methods.creditUserReward = function (creditAmount: number) {
  this.currentRewardValue += creditAmount;
  return this.currentRewardValue;
};

UserRewardSchema.methods.debitUserReward = function (debitAmount: number) {
  this.currentRewardValue -= debitAmount;
  return this.currentRewardValue;
};
