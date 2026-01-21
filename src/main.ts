import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: [
      'https://zambiagreeninvestmentportal.vercel.app',
      'http://localhost:5173',
      'http://pilot-uat.seczambia.org.zm:5173',
    ],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Zambia Green Investment Portal API')
    .setDescription('This is the documentation for the API')
    .setVersion('1.0')
    .addTag('')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Serve files from local folder
  app.use('/files', express.static('/app/uploads'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
