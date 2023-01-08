import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersResolver } from './answers.resolver';

@Module({
  providers: [AnswersResolver, AnswersService],
})
export class AnswersModule {}
