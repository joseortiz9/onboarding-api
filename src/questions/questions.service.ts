import { Injectable } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { PrismaService } from 'nestjs-prisma';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class QuestionsService {
  constructor(
    private storageService: StorageService,
    private prisma: PrismaService
  ) {}

  create(createQuestionInput: CreateQuestionInput) {
    return 'This action adds a new question';
  }

  findAll() {
    return `This action returns all questions`;
  }
}
