import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, Min, MinLength } from 'class-validator';

@InputType()
export class CreateRewardInput {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field(() => Int)
  @Min(0)
  starsCost: number;
}
