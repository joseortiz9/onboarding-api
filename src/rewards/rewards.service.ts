import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRewardInput } from './dto/create-reward.input';
import { PrismaService } from 'nestjs-prisma';
import { User } from '../users/models/user.model';
import { Reward } from './entities/reward.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  create(createRewardInput: CreateRewardInput) {
    return this.prisma.reward.create({
      data: {
        name: createRewardInput.name,
        starsCost: createRewardInput.starsCost,
      },
    });
  }

  findAll() {
    return this.prisma.reward.findMany();
  }

  async userRewards(userId: number) {
    const rewards = await this.prisma.usersRewards.findMany({
      where: { userId },
      include: { reward: true },
    });
    return rewards.map(({ reward }) => reward);
  }

  async claimReward(user: User, rewardId: number): Promise<Reward> {
    try {
      const reward = await this.prisma.reward.findUniqueOrThrow({
        where: { id: rewardId },
      });
      if (user.stars < reward.starsCost) {
        throw new ConflictException('Not enough stars to claim this reward.');
      }
      await this.prisma.usersRewards.create({
        data: {
          userId: user.id,
          rewardId,
        },
      });
      await this.prisma.user.update({
        where: { id: user.id },
        data: { stars: user.stars - reward.starsCost },
      });
      return reward;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`User already claimed this reward.`);
      }
      throw new Error(e);
    }
  }
}
