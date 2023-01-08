import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UserIdArgs {
  userId: number;
}
