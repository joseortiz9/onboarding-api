import 'reflect-metadata';
import {
  Field,
  HideField,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';
import { Topic } from 'src/topics/entities/topic.entity';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User extends BaseModel {
  @Field()
  username: string;
  @Field()
  stars: number;

  @Field(() => Role)
  role: Role;

  @Field(() => [Topic])
  topics: Topic[];

  @HideField()
  password: string;
}
