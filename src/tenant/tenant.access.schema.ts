import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tenant } from './tenant.schema';
import { v4 as uuidv4 } from 'uuid';
import { randomPasswordGenerator } from '../common/utils';

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

  constructor(tenantId) {
    this.accessKey = uuidv4();
    this.accessSecret = randomPasswordGenerator(40);
    this.tenant = tenantId;
    this.isActive = true;
  }
}
export const TenantAccessSchema = SchemaFactory.createForClass(TenantAccess);
