import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AwsS3Service {
    private client: S3Client
    private bucketName = this.configService.get('S3_BUCKET_NAME')

    constructor(
        private readonly configService: ConfigService
    ) {
        const s3_region = this.configService.get('S3_REGION')

        this.client = new S3Client({
            region: s3_region,
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
            }
        })
    }

    async uploadSingleFile(file: Express.Multer.File, key: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
            Metadata: {
                originalName: file.originalname,
            },
        })

        await this.client.send(command)
        return this.getFileUrl(key)
    }

    getFileUrl(key: string) {
        return `https://${this.bucketName}.s3.amazonaws.com/${key}`
    }
}