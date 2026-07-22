import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.FRONTEND_URL}/user/verify-email?token=${token}`;
    console.log('URL is ', verificationUrl);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `
        <h2>Welcome!</h2>
        <p>Thanks for registering.</p>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
      `,
    });
  }
}
