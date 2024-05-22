import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './models/accessToken.model';
import { ConfigService } from '@nestjs/config';
import { AccessTokenInput } from './dto/accessToken.input';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.model';
import { FindUserInput } from '../users/dto/findUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async getAccessToken(
    ctx: any,
    params: AccessTokenInput,
  ): Promise<AccessToken> {
    const payload = { username: params.username };
    const jwtSecretKey = this.config.get('JWT_TOKEN_SECRET');

    return {
      token: this.jwtService.sign(payload, {
        secret: jwtSecretKey,
      }),
      message: null,
    } as AccessToken;
  }

  async validateUser(payload: FindUserInput): Promise<User> {
    const user = await this.usersService.findOne({
      username: payload.username,
      password: payload.password,
    });

    return user || null;
  }
}
