import { Test, TestingModule } from '@nestjs/testing';
import { RewardRedemptionController } from './reward-redemption.controller';

describe('RewardRedemptionController', () => {
  let controller: RewardRedemptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardRedemptionController],
    }).compile();

    controller = module.get<RewardRedemptionController>(RewardRedemptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
