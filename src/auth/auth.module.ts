import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminUsersModule } from 'src/admin-users/admin-users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from 'src/users/users.module';
import { UserLocalStrategy } from './strategies/user-local.strategy';

@Module({
  imports: [
    AdminUsersModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, AdminLocalStrategy, UserLocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
