import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tenant } from '../../tenant/schemas/tenant.schema';
import { CreditRewardsDto } from '../dtos/credit-rewards.dto';
import { DebitRewardDto } from '../dtos/debit-reward.dto';

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

  constructor(rewards: CreditRewardsDto | DebitRewardDto, tenantId) {
    this.tenant = tenantId;
    this.userId = rewards.userId;
    this.totalRewardPoints = rewards.rewardValue;
    this.currentRewardPoints = this.totalRewardPoints;
    this.transactionMeta = rewards.transactionMeta;
    this.userMeta = rewards.userMeta;
    if (rewards instanceof CreditRewardsDto) {
      this.type = 'credit';
      this.expiryDate = rewards.expiryDate;
    } else if (rewards instanceof DebitRewardDto) {
      this.type = 'debit';
    }
  }
}

export const RewardsLedgerSchema = SchemaFactory.createForClass(RewardsLedger);
