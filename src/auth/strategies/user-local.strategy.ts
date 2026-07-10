import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserRole } from '@prisma/client';
import { UserWithRelations } from 'src/users/users.types';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(
  Strategy,
  'user-local',
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<UserWithRelations> {
    console.log('Login attempt:', email, password);
    const user = await this.authService.validate(email, password);
    console.log('User: ', user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    } else if (user.role === UserRole.USER && !user.isVerified) {
      throw new UnauthorizedException(
        'Your account has not been verified. Please check your email inbox for the verification link.',
      );
    }

    return user;
  }
}
