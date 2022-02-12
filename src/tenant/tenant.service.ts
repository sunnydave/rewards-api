import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant, TenantDocument } from './tenant.schema';
import { Model, Schema, ObjectId } from 'mongoose';
import { TenantAccess, TenantAccessDocument } from './tenant.access.schema';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name)
    private readonly tenantModel: Model<TenantDocument>,
    @InjectModel(TenantAccess.name)
    private readonly tenantAccessModel: Model<TenantAccessDocument>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const createdTenant = await this.tenantModel.create(createTenantDto);
    return createdTenant;
  }

  async createTenantAccess(tenantId: string): Promise<TenantAccess> {
    const createdTenantAccess = await this.tenantAccessModel.create(
      new TenantAccess(tenantId),
    );
    return createdTenantAccess;
  }

  async getTenant(tenantId: string): Promise<Tenant> {
    const tenant = await this.tenantModel
      .findOne({
        _id: tenantId,
      })
      .exec();
    return tenant;
  }

  async validateTenantAccess(apiKey: string, apiSecret: string): Promise<any> {
    const tenantAccess = await this.tenantAccessModel
      .findOne({
        accessKey: apiKey,
        accessSecret: apiSecret,
      })
      .exec();
    if (tenantAccess && tenantAccess.isActive) {
      return {
        isValid: true,
        tenantId: tenantAccess.tenant,
      };
    } else {
      return {
        isValid: false,
      };
    }
  }
}
