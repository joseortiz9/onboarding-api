import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsResolver } from './topics.resolver';

@Module({
  providers: [TopicsResolver, TopicsService],
})
export class TopicsModule {}
