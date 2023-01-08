import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @Field(() => Int)
  questionId: number;
  @Field()
  @IsNotEmpty()
  userAnswer: string;
}
