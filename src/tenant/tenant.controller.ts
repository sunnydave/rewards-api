import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ApiKeyGuard } from '../auth/guards/apiKey.guard';
import { TenantId } from '../auth/decorators/tenant.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tenant')
@ApiTags('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new tenant',
  })
  async createTenant(@Body() createTenantDto: CreateTenantDto) {
    const tenant = await this.tenantService.create(createTenantDto);
    const tenantAccess = this.tenantService.createTenantAccess(tenant._id);
    return tenantAccess;
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  @ApiOperation({
    summary: 'Get tenant details',
  })
  async getTenant(@TenantId() tenantId: string) {
    const tenant = await this.tenantService.getTenant(tenantId);
    return tenant;
  }
}
