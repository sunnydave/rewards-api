import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ApiKeyGuard } from '../auth/guards/apiKey.guard';
import { TenantId } from '../auth/decorators/tenant.decorator';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createTenant(@Body() createTenantDto: CreateTenantDto) {
    const tenant = await this.tenantService.create(createTenantDto);
    const tenantAccess = this.tenantService.createTenantAccess(tenant._id);
    return tenantAccess;
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  async getTenant(@TenantId() tenantId: string) {
    const tenant = await this.tenantService.getTenant(tenantId);
    return tenant;
  }
}
