import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './models/user.model';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/currentUser.decorator';

@Resolver()
export class UsersResolver {
  @UseGuards(GqlAuthGuard)
  @Query(() => User, { description: `Get current user information.` })
  async user(@CurrentUser() user: User): Promise<User> {
    return user as User;
  }
}
