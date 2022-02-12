import { Injectable } from '@nestjs/common';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class AuthService {
  constructor(private readonly tenantService: TenantService) {}

  async validateApiKey(apiKey: string, apiSecret: string) {
    const isValidAccess = await this.tenantService.validateTenantAccess(
      apiKey,
      apiSecret,
    );
    return isValidAccess;
  }
}
