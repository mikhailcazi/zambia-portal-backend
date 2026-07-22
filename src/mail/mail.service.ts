import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService implements OnModuleInit {
  constructor(private readonly mailerService: MailerService) {}

  async onModuleInit() {
    await this.verifySMTP();
  }

  async verifySMTP() {
    try {
      const transporter = this.mailerService.getTransporter();

      await transporter.verify();

      console.log('SMTP connection and authentication successful');
    } catch (error) {
      console.error('SMTP verification failed:', error);
    }
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.FRONTEND_URL}/user/verify-email?token=${token}`;
    console.log('URL is ', verificationUrl);

    try {
      const result = await this.mailerService.sendMail({
        to: email,
        subject: 'Verify your email',
        html: `
          <h2>Welcome!</h2>
          <p>Thanks for registering.</p>
          <p>Click the link below to verify your email:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
        `,
      });

      console.log('Email send result:', result);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw error;
    }
  }
}
