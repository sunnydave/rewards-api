import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../auth/guards/apiKey.guard';
import { TenantId } from '../auth/decorators/tenant.decorator';
import { UserRewardsService } from './user-rewards.service';

@Controller('user-rewards')
export class UserRewardsController {
  constructor(private readonly userRewardsService: UserRewardsService) {}

  @Get(':userId/currentRewardValue')
  @UseGuards(ApiKeyGuard)
  async getCurrentRewardValue(
    @TenantId() tenantId: string,
    @Param('userId') userId: string,
  ) {
    return await this.userRewardsService.getUserCurrentRewardPoints(
      tenantId,
      userId,
    );
  }

  @Get(':userId/userLedger')
  @UseGuards(ApiKeyGuard)
  async getUserLedger(
    @TenantId() tenantId: string,
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 100,
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.userRewardsService.getUserLedger(
      tenantId,
      userId,
      page,
      limit,
    );
  }
}
