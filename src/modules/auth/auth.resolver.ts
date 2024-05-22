import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AccessToken } from './models/accessToken.model';
import { AccessTokenInput } from './dto/accessToken.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessToken, { description: `Creates a new access token.` })
  async getAccessToken(
    @Context() ctx: any,
    @Args('accessTokenInput') params: AccessTokenInput,
  ): Promise<AccessToken> {
    return await this.authService.getAccessToken(ctx, params);
  }
}
