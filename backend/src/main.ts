import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
  const port = process.env.PORT ?? 4000
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Paint API')
    .setDescription('The paint API description')
    .setVersion('1.0')
    .addTag('paint')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe())
  SwaggerModule.setup(globalPrefix, app, documentFactory);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
bootstrap();
