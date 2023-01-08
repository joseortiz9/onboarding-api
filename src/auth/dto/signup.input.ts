import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  username: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
