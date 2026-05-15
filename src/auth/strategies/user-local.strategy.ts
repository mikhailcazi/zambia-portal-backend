import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ProjectOwner } from '@prisma/client';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(
  Strategy,
  'user-local',
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<ProjectOwner> {
    console.log('JWT payload received in strategy:', email, password);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    } else if (!user.isVerified) {
      throw new UnauthorizedException('Please verify email first');
    }
    return user;
  }
}
