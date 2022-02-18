import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantModule } from './tenant/tenant.module';
import { AuthModule } from './auth/auth.module';
import { RewardConfigurationModule } from './reward-configuration/reward-configuration.module';
import { RewardRedemptionModule } from './reward-redemption/reward-redemption.module';
import { UserRewardsModule } from './user-rewards/user-rewards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_CONNECTION'),
        dbName: 'rewardsApi',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    TenantModule,
    AuthModule,
    RewardConfigurationModule,
    RewardRedemptionModule,
    UserRewardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
