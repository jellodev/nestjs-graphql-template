import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: `Find user parameters` })
export class FindUserInput {
  @Field(() => String, { description: `login username` })
  username: string;

  @Field(() => String, { description: `login password` })
  password: string;
}
