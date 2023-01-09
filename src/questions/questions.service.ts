import { Injectable } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { PrismaService } from 'nestjs-prisma';
import { User } from '../users/models/user.model';
import { MediaService } from '../media/media.service';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly mediaService: MediaService,
    private prisma: PrismaService
  ) {}

  async create(user: User, createQuestionInput: CreateQuestionInput) {
    const topic = await this.prisma.topic.findUniqueOrThrow({
      where: { id: createQuestionInput.topicId },
    });
    const docFile = await this.mediaService.create({
      fileUpload: createQuestionInput.docFile,
      locationSlug: `topic_${topic.id}`,
    });
    return await this.prisma.question.create({
      data: {
        question: createQuestionInput.question,
        correctAnswer: createQuestionInput.correctAnswer,
        starsAmount: createQuestionInput.starsAmount || 0,
        topicId: topic.id,
        docId: docFile.id,
      },
    });
  }

  findAll() {
    return this.prisma.question.findMany();
  }

  async userQuestions(user: User) {
    const userTopics = await this.prisma.usersTopics.findMany({
      where: { userId: user.id },
    });
    return await this.prisma.question.findMany({
      where: { topicId: { in: userTopics.map((topic) => topic.topicId) } },
    });
  }
}
