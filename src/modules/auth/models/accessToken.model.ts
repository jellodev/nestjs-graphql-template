import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: `access token` })
export class AccessToken {
  @Field(() => String, { description: `access token`, nullable: true })
  token: string;

  @Field(() => String, { description: `error message`, nullable: true })
  message: string;
}
