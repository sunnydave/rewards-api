import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RewardRedemptionService } from './reward-redemption.service';
import { ApiKeyGuard } from '../auth/guards/apiKey.guard';
import { TenantId } from '../auth/decorators/tenant.decorator';
import { CreateRewardRedemptionDto } from './dto/create-reward-redemption.dto';
import { RedeemRewardDto } from './dto/redeem-reward.dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@Controller('reward-redemption')
@ApiTags('reward-redemption')
export class RewardRedemptionController {
  constructor(
    private readonly rewardRedemptionService: RewardRedemptionService,
  ) {}

  @Post('createConfiguration')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({
    summary: 'Create reward redemption rule',
  })
  async createRewardRedemption(
    @TenantId() tenantId: string,
    @Body() createRewardRedemptionDto: CreateRewardRedemptionDto,
  ) {
    if (
      !createRewardRedemptionDto.rules ||
      createRewardRedemptionDto.rules.length === 0
    ) {
      throw new HttpException(
        'Missing property rules in the request body',
        HttpStatus.BAD_REQUEST,
      );
    }
    createRewardRedemptionDto.tenant = tenantId;
    const createdRewardRedemption =
      await this.rewardRedemptionService.createRewardRedemptionConfig(
        createRewardRedemptionDto,
      );
    return createdRewardRedemption;
  }

  @Get('allApplicableRules')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({
    summary: 'Get all redemption rules applicable to the transaction',
  })
  async getAllApplicableRules(
    @TenantId() tenantId: string,
    @Body() redeemRewardDto: RedeemRewardDto,
  ) {
    const applicableRules =
      await this.rewardRedemptionService.getAllApplicableRewards(
        redeemRewardDto,
        tenantId,
      );
    return applicableRules;
  }

  @Post('applyReward/:redemptionId')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({
    summary: 'Redeem the reward for the transaction',
  })
  async redeemRewards(
    @TenantId() tenantId: string,
    @Body() redeemRewardDto: RedeemRewardDto,
    @Param('redemptionId') redemptionId,
  ) {
    const rewardRedeemed = await this.rewardRedemptionService.redeemReward(
      redeemRewardDto,
      tenantId,
      redemptionId,
    );
    if (rewardRedeemed) {
      return true;
    } else {
      throw new HttpException(
        'Reward cannot be applied for the given transaction',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
