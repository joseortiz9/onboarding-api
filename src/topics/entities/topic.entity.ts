import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Question } from 'src/questions/entities/question.entity';

@ObjectType()
export class Topic extends BaseModel {
  @Field()
  name: string;

  @Field(() => [Question])
  questions: Question[];
}
