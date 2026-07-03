// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from '../auth.service';
// import { Admin } from '@prisma/client';

// @Injectable()
// export class AdminLocalStrategy extends PassportStrategy(
//   Strategy,
//   'admin-local',
// ) {
//   constructor(private authService: AuthService) {
//     super();
//   }

//   async validate(email: string, password: string): Promise<Admin> {
//     console.log('JWT payload received in strategy:', email, password);

//     const user = await this.authService.validate(email, password);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
