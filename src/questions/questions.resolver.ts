import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { Topic } from '../topics/entities/topic.entity';
import { PrismaService } from 'nestjs-prisma';
import { MediaFile } from '../media/models/media-file.model';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(
    private readonly questionsService: QuestionsService,
    private prisma: PrismaService
  ) {}

  @Mutation(() => Question)
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput
  ) {
    return this.questionsService.create(createQuestionInput);
  }

  @Query(() => [Question], { name: 'questions' })
  findAll() {
    return this.questionsService.findAll();
  }

  @ResolveField('topic', () => Topic)
  topic(@Parent() question: Question) {
    return this.prisma.question
      .findUnique({ where: { id: question.id } })
      .topic();
  }

  @ResolveField('doc', () => MediaFile)
  doc(@Parent() question: Question) {
    return this.prisma.question
      .findUnique({ where: { id: question.id } })
      .doc();
  }
}
