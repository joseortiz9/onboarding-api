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

  create(user: User, createQuestionInput: CreateQuestionInput) {
    return 'This action adds a new question';
  }

  findAll() {
    return `This action returns all questions`;
  }
}
