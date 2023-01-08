import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RewardsService } from './rewards.service';
import { Reward } from './entities/reward.entity';
import { CreateRewardInput } from './dto/create-reward.input';
import { UserIdArgs } from 'src/common/args/user-id.args';
import { RewardIdArgs } from './args/reward-id.args';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '../users/models/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => Reward)
export class RewardsResolver {
  constructor(private readonly rewardsService: RewardsService) {}

  @Mutation(() => Reward)
  createReward(
    @Args('createRewardInput') createRewardInput: CreateRewardInput
  ) {
    return this.rewardsService.create(createRewardInput);
  }

  @Query(() => [Reward], { name: 'rewards' })
  findAll() {
    return this.rewardsService.findAll();
  }

  @Query(() => [Reward])
  userRewards(@Args() id: UserIdArgs) {
    return this.rewardsService.userRewards(id.userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Reward)
  async claimReward(
    @UserEntity() user: User,
    @Args('rewardIdArgs') rewardIdArgs: RewardIdArgs
  ) {
    return await this.rewardsService.claimReward(user, rewardIdArgs.rewardId);
  }
}
