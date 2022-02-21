import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../auth/guards/apiKey.guard';
import { TenantId } from '../auth/decorators/tenant.decorator';
import { UserRewardsService } from './user-rewards.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@Controller('user-rewards')
@ApiTags('user-rewards')
export class UserRewardsController {
  constructor(private readonly userRewardsService: UserRewardsService) {}

  @Get(':userId/currentRewardValue')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({
    summary: 'Get current active reward value for the user',
  })
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
  @ApiOperation({
    summary: 'Get user reward ledger',
  })
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
