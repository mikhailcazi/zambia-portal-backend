import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserWithRelations } from 'src/users/users.types';
import { CreateProjectOwnerDto } from 'src/project-owner/dto/create-project-owner.dto';
import { randomBytes } from 'crypto';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(
    email: string,
    pass: string,
  ): Promise<UserWithRelations | null> {
    const user = await this.usersService.findOne(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) return null;

    console.log('User logged in: ', user);
    return user;
  }

  login(user: UserWithRelations) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async create(createProjectOwnerDto: CreateProjectOwnerDto) {
    const token = randomBytes(32).toString('hex');

    const hashedPassword = await bcrypt.hash(
      createProjectOwnerDto.password,
      10,
    );

    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: createProjectOwnerDto.email,
          password: hashedPassword,
          role: UserRole.USER,
          isVerified: true, // TODO: change when email setup
          verifyToken: token,
          verifyTokenExp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        },
      });

      const owner = await tx.projectOwner.create({
        data: {
          userId: user.id,
          name: createProjectOwnerDto.name,
          organization: createProjectOwnerDto.organization,
          location: createProjectOwnerDto.location,
          position: createProjectOwnerDto.position,
        },
      });

      return { user, owner };
    });

    return {
      email: result.user.email,
      createdAt: result.owner.createdAt,
    };
  }

  async verify(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExp: { gt: new Date() },
      },
    });

    if (!user) throw new BadRequestException('Invalid token');

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExp: null,
      },
    });
  }
  // async validateAdmin(email: string, pass: string): Promise<Admin | null> {
  //   const admin = await this.adminUsersService.findOne(email);
  //   if (!admin) return null;

  //   const isValid = await bcrypt.compare(pass, admin.password);
  //   if (!isValid) return null;

  //   console.log(admin);
  //   return admin;
  // }

  // adminLogin(user: Admin) {
  //   const payload = {
  //     username: user.username,
  //     sub: user.id,
  //     role: 'ADMIN',
  //   };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  // async validateUser(
  //   email: string,
  //   pass: string,
  // ): Promise<ProjectOwner | null> {
  //   const user = await this.usersService.findOne(email);
  //   if (!user) return null;

  //   const isValid = await bcrypt.compare(pass, user.password);
  //   if (!isValid) return null;

  //   console.log(user);
  //   return user;
  // }
}
