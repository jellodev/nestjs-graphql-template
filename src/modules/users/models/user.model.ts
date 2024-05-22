import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: `User` })
export class User {
  @Field(() => String, { description: `login username` })
  username: string;

  @Field(() => String, { description: `name`, nullable: true })
  name: string;
}
