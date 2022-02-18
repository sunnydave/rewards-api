import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({
  _id: false,
})
export class RewardRule extends Document {
  @Prop({ required: true, default: true })
  active: boolean;

  @Prop({ required: true })
  measure: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  measureValue: any;

  @Prop({ required: true })
  measureComparator: string;

  isRuleApplicable!: (transaction: any) => boolean;
}

export const RewardRuleSchema = SchemaFactory.createForClass(RewardRule);
RewardRuleSchema.methods.isRuleApplicable = function (transaction: any) {
  switch (this.measureComparator) {
    case 'eq':
      if (transaction[this.measure] === this.measureValue) {
        return true;
      }
    case 'gt':
      if (transaction[this.measure] > this.measureValue) {
        return true;
      }
    case 'gte':
      if (transaction[this.measure] >= this.measureValue) {
        return true;
      }
    default:
      return false;
  }
};
