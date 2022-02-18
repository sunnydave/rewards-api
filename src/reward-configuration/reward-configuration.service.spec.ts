import { Test, TestingModule } from '@nestjs/testing';
import { RewardConfigurationService } from './reward-configuration.service';

describe('RewardConfigurationService', () => {
  let service: RewardConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardConfigurationService],
    }).compile();

    service = module.get<RewardConfigurationService>(RewardConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
