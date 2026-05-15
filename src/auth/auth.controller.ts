import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLocalAuthGuard } from './guards/user-local.auth.guard';
import { AdminLocalAuthGuard } from './guards/admin-local-auth.guard';

// auth.controller.ts
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AdminLocalAuthGuard)
  @Post('admin/login')
  login(@Request() req) {
    return this.authService.adminLogin(req.user);
  }

  @UseGuards(UserLocalAuthGuard)
  @Post('login')
  userLogin(@Request() req) {
    return this.authService.userLogin(req.user);
  }

  // @Post('logout')
  // logout() {
  //   return { message: 'Logged out' };
  // }
}
