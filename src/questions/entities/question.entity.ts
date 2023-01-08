import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Topic } from 'src/topics/entities/topic.entity';
import { MediaFile } from 'src/media/models/media-file.model';

@ObjectType()
export class Question extends BaseModel {
  @Field(() => String)
  question: string;
  @Field(() => String)
  correctAnswer: string;
  @Field(() => Int)
  starsAmount: number;
  @Field(() => Topic)
  topic: Topic;
  @Field(() => MediaFile)
  doc: MediaFile;
}
