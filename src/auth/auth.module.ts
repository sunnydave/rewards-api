import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { TenantModule } from '../tenant/tenant.module';
import { ApiKeyStrategy } from './strategies/apiKey.strategy';

@Module({
  imports: [PassportModule, TenantModule],
  providers: [AuthService, ApiKeyStrategy],
})
export class AuthModule {}
