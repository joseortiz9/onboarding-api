import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TopicsService } from './topics.service';
import { Topic } from './entities/topic.entity';
import { CreateTopicInput } from './dto/create-topic.input';
import { PrismaService } from 'nestjs-prisma';
import { Question } from 'src/questions/entities/question.entity';
import { UserIdArgs } from 'src/common/args/user-id.args';

@Resolver(() => Topic)
export class TopicsResolver {
  constructor(
    private readonly topicsService: TopicsService,
    private prisma: PrismaService
  ) {}

  @Mutation(() => Topic)
  async createTopic(
    @Args('createTopicInput') createTopicInput: CreateTopicInput
  ) {
    return await this.topicsService.create(createTopicInput);
  }

  @Query(() => [Topic], { name: 'topics' })
  async findAll() {
    return await this.topicsService.findAll();
  }

  @Query(() => [Topic])
  async userTopics(@Args() id: UserIdArgs) {
    return await this.topicsService.userTopics(id.userId);
  }

  @ResolveField('questions', () => [Question])
  questions(@Parent() topic: Topic) {
    return this.prisma.topic
      .findUnique({ where: { id: topic.id } })
      .questions();
  }
}
