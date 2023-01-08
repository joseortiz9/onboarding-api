import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RewardIdArgs {
  @Field(() => Int)
  rewardId: number;
}
