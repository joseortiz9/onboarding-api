import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Reward extends BaseModel {
  @Field()
  name: string;
  @Field(() => Int)
  starsCost: number;
}
