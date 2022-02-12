import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tenant } from './tenant.schema';

export type TenantAccessDocument = TenantAccess & Document;

@Schema({
  timestamps: true,
})
export class TenantAccess {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
  })
  tenant: Tenant;

  @Prop({
    required: true,
  })
  accessKey: string;

  @Prop({
    required: true,
  })
  accessSecret: string;

  @Prop()
  isActive: boolean;
}
export const TenantAccessSchema = SchemaFactory.createForClass(TenantAccess);
