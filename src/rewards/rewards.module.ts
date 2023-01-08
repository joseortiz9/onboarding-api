import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RewardsResolver } from './rewards.resolver';

@Module({
  providers: [RewardsResolver, RewardsService],
})
export class RewardsModule {}
