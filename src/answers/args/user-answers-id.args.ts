import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UserAnswersIdArgs {
  userId: number;
  questionId?: number;
}
