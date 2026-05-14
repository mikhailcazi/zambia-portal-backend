import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  'admin-local',
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('JWT payload received in strategy:', username, password);

    const user = await this.authService.validateAdmin(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
