// s3.service.ts
import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private s3 = new S3Client({
    region: process.env.AWS_REGION || 'eu-west-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  async uploadFile(buffer: Buffer, key: string, mimetype: string) {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
      }),
    );

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }

  async getPresignedUrl(key: string, expiresInSeconds = 3600) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const url = (await getSignedUrl(this.s3, command, {
      expiresIn: expiresInSeconds,
    })) as string;

    return url;
  }
}
