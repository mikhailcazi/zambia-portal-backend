import { Injectable } from '@nestjs/common';
import { AdminUsersService } from '../admin/admin-users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private adminUsersService: AdminUsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const admin = await this.adminUsersService.findOne(username);
    if (!admin) return null;

    const isValid = await bcrypt.compare(pass, admin.password);
    if (!isValid) return null;

    console.log(admin);
    return admin;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
