import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AnswersService } from './answers.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { PrismaService } from 'nestjs-prisma';
import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/models/user.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { UserAnswersIdArgs } from './args/user-answers-id.args';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(
    private readonly answersService: AnswersService,
    private prisma: PrismaService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Answer)
  createAnswer(
    @UserEntity() user: User,
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput
  ) {
    return this.answersService.create(user, createAnswerInput);
  }

  @Query(() => [Answer], { name: 'answers' })
  findAll() {
    return this.answersService.findAll();
  }

  @Query(() => [Answer])
  userAnswers(@Args() userAnswersIdArgs: UserAnswersIdArgs) {
    return this.answersService.userAnswers(userAnswersIdArgs);
  }

  @ResolveField('question', () => Question)
  question(@Parent() answer: Answer) {
    return this.prisma.answer
      .findUnique({
        where: {
          userId_questionId: {
            questionId: answer.questionId,
            userId: answer.userId,
          },
        },
      })
      .question();
  }

  @ResolveField('user', () => User)
  user(@Parent() answer: Answer) {
    return this.prisma.answer
      .findUnique({
        where: {
          userId_questionId: {
            questionId: answer.questionId,
            userId: answer.userId,
          },
        },
      })
      .user();
  }
}
