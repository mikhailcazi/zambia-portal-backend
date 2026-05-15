import { Injectable } from '@nestjs/common';
import { AdminUsersService } from '../admin-users/admin-users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { Admin, ProjectOwner } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private adminUsersService: AdminUsersService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, pass: string): Promise<Admin | null> {
    const admin = await this.adminUsersService.findOne(username);
    if (!admin) return null;

    const isValid = await bcrypt.compare(pass, admin.password);
    if (!isValid) return null;

    console.log(admin);
    return admin;
  }

  adminLogin(user: Admin) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: 'ADMIN',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<ProjectOwner | null> {
    const user = await this.usersService.findOne(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) return null;

    console.log(user);
    return user;
  }

  userLogin(user: ProjectOwner) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: 'USER',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
