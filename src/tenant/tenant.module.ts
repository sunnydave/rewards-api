import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from './schemas/tenant.schema';
import {
  TenantAccess,
  TenantAccessSchema,
} from './schemas/tenant.access.schema';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
      { name: TenantAccess.name, schema: TenantAccessSchema },
    ]),
  ],
  exports: [TenantService],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
