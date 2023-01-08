import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsResolver } from './questions.resolver';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [MediaModule],
  providers: [QuestionsResolver, QuestionsService],
})
export class QuestionsModule {}
