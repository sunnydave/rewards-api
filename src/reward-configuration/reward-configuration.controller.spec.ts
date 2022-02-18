import { Test, TestingModule } from '@nestjs/testing';
import { RewardConfigurationController } from './reward-configuration.controller';

describe('RewardConfigurationController', () => {
  let controller: RewardConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardConfigurationController],
    }).compile();

    controller = module.get<RewardConfigurationController>(RewardConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
