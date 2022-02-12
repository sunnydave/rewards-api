import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant, TenantDocument } from './tenant.schema';
import { Model, Schema, ObjectId } from 'mongoose';
import { TenantAccess, TenantAccessDocument } from './tenant.access.schema';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { v4 as uuidv4 } from 'uuid';
import { randomPasswordGenerator } from '../common/utils';

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
    const accessKey = uuidv4();
    const accessSecret = randomPasswordGenerator(40);
    const createdTenantAccess = await this.tenantAccessModel.create({
      tenant: tenantId,
      accessKey: accessKey,
      accessSecret: accessSecret,
    });
    return createdTenantAccess;
  }

  async validateTenantAccess(
    apiKey: string,
    apiSecret: string,
  ): Promise<boolean> {
    const tenantAccess = await this.tenantAccessModel
      .findOne({
        accessKey: apiKey,
        accessSecret: apiSecret,
      })
      .exec();
    if (tenantAccess) {
      return true;
    } else {
      return false;
    }
  }
}
