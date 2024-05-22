import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: `Creates a access token parameters` })
export class AccessTokenInput {
  @Field(() => String, { description: `login username` })
  username: string;

  @Field(() => String, { description: `login password` })
  password: string;
}
