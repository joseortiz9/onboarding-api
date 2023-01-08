import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from 'src/questions/entities/question.entity';
import { BaseModel } from 'src/common/models/base.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Answer extends BaseModel {
  @Field()
  answer: string;
  @Field(() => Int)
  questionId: number;
  @Field(() => Question)
  question: Question;
  @Field(() => Int)
  userId: number;
  @Field(() => User)
  user: User;
  @Field(() => Boolean)
  isCorrect: boolean;
}
