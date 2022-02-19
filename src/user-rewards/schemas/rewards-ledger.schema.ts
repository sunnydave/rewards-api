import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tenant } from '../../tenant/schemas/tenant.schema';
import { CreditRewardsDto } from '../dtos/credit-rewards.dto';

export type RewardsLedgerDocument = RewardsLedger & Document;

@Schema({
  timestamps: true,
})
export class RewardsLedger {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
  })
  tenant: Tenant;

  @Prop()
  userId: string;

  @Prop()
  totalRewardPoints: number;

  @Prop()
  currentRewardPoints: number;

  @Prop({
    type: String,
    enum: ['credit', 'debit'],
    default: 'credit',
  })
  type: string;

  @Prop()
  expiryDate: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  transactionMeta: any;

  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  userMeta: any;

  constructor(creditRewards: CreditRewardsDto, tenantId) {
    this.tenant = tenantId;
    this.userId = creditRewards.userId;
    this.totalRewardPoints = creditRewards.rewardValue;
    this.currentRewardPoints = this.totalRewardPoints;
    this.type = 'credit';
    this.expiryDate = creditRewards.expiryDate;
    this.transactionMeta = creditRewards.transactionMeta;
    this.userMeta = creditRewards.userMeta;
  }
}

export const RewardsLedgerSchema = SchemaFactory.createForClass(RewardsLedger);
