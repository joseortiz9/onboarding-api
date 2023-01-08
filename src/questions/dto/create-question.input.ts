import { InputType, Int, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/common/models/file-upload.model';
import { Min, MinLength } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field(() => String)
  @MinLength(0)
  question: string;
  @Field(() => String)
  correctAnswer: string;
  @Field(() => Int)
  @Min(1)
  starsAmount: number;
  @Field(() => Int)
  topicId: number;
  @Field(() => GraphQLUpload)
  docFile: Promise<FileUpload>;
}
