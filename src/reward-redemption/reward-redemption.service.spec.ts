import { Test, TestingModule } from '@nestjs/testing';
import { RewardRedemptionService } from './reward-redemption.service';

describe('RewardRedemptionService', () => {
  let service: RewardRedemptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardRedemptionService],
    }).compile();

    service = module.get<RewardRedemptionService>(RewardRedemptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
