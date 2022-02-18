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

@Controller('reward-configuration')
export class RewardConfigurationController {
  constructor(
    private readonly rewardConfigurationService: RewardConfigurationService,
  ) {}

  @Post()
  @UseGuards(ApiKeyGuard)
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
  async getAllRewards(@TenantId() tenantId) {
    const rewards =
      await this.rewardConfigurationService.getAllRewardConfigurations(
        tenantId,
      );
    return rewards;
  }

  @Post('/applyReward')
  @UseGuards(ApiKeyGuard)
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
