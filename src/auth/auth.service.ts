import { BadRequestException, Injectable } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserWithRelations } from 'src/users/users.types';
import { CreateProjectOwnerDto } from 'src/project-owner/dto/create-project-owner.dto';
import { randomBytes } from 'crypto';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validate(
    email: string,
    pass: string,
  ): Promise<UserWithRelations | null> {
    const user = await this.usersService.findByEmail(email);
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
          isVerified: false,
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

    const token = this.jwtService.sign(
      { userId: result.user.id, email: result.user.email },
      {
        secret: process.env.EMAIL_VERIFICATION_SECRET,
        expiresIn: '24h',
      },
    );

    await this.mailService.sendVerificationEmail(result.user.email, token);

    console.log({ message: 'Email sent' });

    return {
      message:
        'Registration successful. Please check your email to verify your account.',
      email: result.user.email,
      createdAt: result.owner.createdAt,
    };
  }

  async verify(token: string) {
    let payload: { userId: number; email: string };

    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.EMAIL_VERIFICATION_SECRET,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new BadRequestException({
          code: 'TOKEN_EXPIRED',
          message: 'This verification link has expired.',
        });
      }

      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('Invalid verification link.');
      }
      throw error;
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new BadRequestException('Invalid verification link.');
    }

    if (user.isVerified) {
      return {
        message: 'Your account was already verified. Please log in.',
      };
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
      },
    });

    return {
      message: 'Your account has been verified successfully.',
    };
  }

  async resendEmail(token: string) {
    const payload: { userId: number; email: string } =
      this.jwtService.decode(token);

    console.log(payload);

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new BadRequestException('Invalid verification link.');
    }

    const newToken = this.jwtService.sign(
      { userId: payload.userId, email: payload.email },
      {
        secret: process.env.EMAIL_VERIFICATION_SECRET,
        expiresIn: '24h',
      },
    );

    await this.mailService.sendVerificationEmail(payload.email, newToken);

    console.log({ message: 'Email sent' });

    return {
      message: 'Email resent!',
    };
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
