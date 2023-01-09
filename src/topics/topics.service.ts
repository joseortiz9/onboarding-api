import { Injectable } from '@nestjs/common';
import { CreateTopicInput } from './dto/create-topic.input';
import { PrismaService } from 'nestjs-prisma';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis
  ) {}
  async create(createTopicInput: CreateTopicInput) {
    await this.redis.del('topics');

    return this.prisma.topic.create({
      data: {
        name: createTopicInput.name,
      },
    });
  }

  async findAll() {
    const _topics = await this.redis.get('topics');
    if (_topics) return JSON.parse(_topics) as Topic[];

    const topics = this.prisma.topic.findMany();
    await this.redis.set('topics', JSON.stringify(topics));
    return topics;
  }

  async userTopics(userId: number) {
    const _topics = await this.redis.get(`topics:userId=${userId}`);
    if (_topics) return JSON.parse(_topics) as Topic[];

    const topicsObj = await this.prisma.usersTopics.findMany({
      where: { userId },
      include: { topic: true },
    });
    const topics = topicsObj.map(({ topic }) => topic);
    await this.redis.set(`topics:userId=${userId}`, JSON.stringify(topics));
    return topics;
  }
}
