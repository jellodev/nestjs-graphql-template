import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { FindUserInput } from './dto/findUser.dto';

@Injectable()
export class UsersService {
  async findOne(user: FindUserInput): Promise<User> {
    if (user) {
      // mock data
      return {
        username: 'developer123',
        name: 'Mihee Kim',
      } as User;
    }
    return;
  }
}
