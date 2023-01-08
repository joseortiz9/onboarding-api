import { Injectable } from '@nestjs/common';
import { CreateTopicInput } from './dto/create-topic.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}
  create(createTopicInput: CreateTopicInput) {
    return this.prisma.topic.create({
      data: {
        name: createTopicInput.name,
      },
    });
  }

  findAll() {
    return this.prisma.topic.findMany();
  }
}
