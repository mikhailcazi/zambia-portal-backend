import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLocalAuthGuard } from './guards/user-local.auth.guard';
import { AdminLocalAuthGuard } from './guards/admin-local-auth.guard';
import { CreateProjectOwnerDto } from 'src/project-owner/dto/create-project-owner.dto';
import { UserWithRelations } from 'src/users/users.types';

export interface AuthenticatedRequest extends Request {
  user: UserWithRelations;
}

// auth.controller.ts
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(UserLocalAuthGuard)
  @Post('login')
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() createProjectOwnerDto: CreateProjectOwnerDto) {
    return this.authService.create(createProjectOwnerDto);
  }

  @Post('verify-email')
  verify(@Body('token') token: string) {
    return this.authService.verify(token);
  }

  @Post('resend-email')
  resendLink(@Body('token') token: string) {
    return this.authService.resendEmail(token);
  }
  // @Post('logout')
  // logout() {
  //   return { message: 'Logged out' };
  // }

  // @UseGuards(AdminLocalAuthGuard)
  // @Post('admin/login')
  // login(@Request() req) {
  //   return this.authService.adminLogin(req.user);
  // }
}
