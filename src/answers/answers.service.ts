import { Injectable } from '@nestjs/common';
import { CreateAnswerInput } from './dto/create-answer.input';
import { User } from 'src/users/models/user.model';
import { PrismaService } from 'nestjs-prisma';
import { UserAnswersIdArgs } from './args/user-answers-id.args';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AnswersService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationsService
  ) {}
  async create(user: User, createAnswerInput: CreateAnswerInput) {
    const question = await this.prisma.question.findUniqueOrThrow({
      where: { id: createAnswerInput.questionId },
    });
    const isCorrect = createAnswerInput.userAnswer === question.correctAnswer;
    const answered = await this.prisma.answer.create({
      data: {
        isCorrect,
        userId: user.id,
        questionId: question.id,
        answer: createAnswerInput.userAnswer,
      },
      include: {
        question: true,
      },
    });
    if (isCorrect) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { stars: user.stars + question.starsAmount },
      });
    }
    await this.notificationService.send();
    return answered;
  }

  userAnswers({ userId, questionId }: UserAnswersIdArgs) {
    return this.prisma.answer.findMany({
      where: { userId, questionId },
      include: { question: true },
    });
  }

  findAll() {
    return this.prisma.answer.findMany();
  }
}
