import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RewardConfigurationService } from './reward-configuration.service';
import { TenantId } from '../auth/decorators/tenant.decorator';
import { RewardConfigurationDto } from './dto/reward-configuration.dto';
import { ApiKeyGuard } from '../auth/guards/apiKey.guard';
import { ApplyRewardDto } from './dto/apply-reward.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('reward-configuration')
@ApiTags('reward-configuration')
export class RewardConfigurationController {
  constructor(
    private readonly rewardConfigurationService: RewardConfigurationService,
  ) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'Create Reward Configuration' })
  @ApiResponse({ status: 400, description: 'Missing required properties' })
  @ApiResponse({ status: 200, description: 'Created reward configuration' })
  async createRewardConfiguration(
    @TenantId() tenantId,
    @Body() createRewardConfigurationDto: RewardConfigurationDto,
  ) {
    createRewardConfigurationDto.tenant = tenantId;
    if (
      !createRewardConfigurationDto.rules ||
      createRewardConfigurationDto.rules.length === 0
    ) {
      throw new HttpException(
        'Missing property rules in the request body',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdRewardConfiguration =
      await this.rewardConfigurationService.saveRewardConfiguration(
        createRewardConfigurationDto,
      );
    return createdRewardConfiguration;
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'All rewards for the tenant' })
  async getAllRewards(@TenantId() tenantId) {
    const rewards =
      await this.rewardConfigurationService.getAllRewardConfigurations(
        tenantId,
      );
    return rewards;
  }

  @Post('/applyReward')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({
    summary: 'Credit reward for the user based on the transaction',
  })
  async applyRewardOnTransaction(
    @TenantId() tenantId,
    @Body() applyRewardDto: ApplyRewardDto,
  ) {
    const appliedReward = await this.rewardConfigurationService.applyReward(
      tenantId,
      applyRewardDto,
    );
    return appliedReward;
  }
}
