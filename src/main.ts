import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import redocExpressMiddleware from 'redoc-express';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('IMKDW Dev API')
    .setDescription('IMKDW Dev 블로그의 API 문서')
    .setVersion('1.0')
    .addTag('IMKDW Dev')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const redocOptions = {
    title: 'IMKDW Dev API',
    version: '1.0',
    specUrl: '/api-json',
  };

  app.use('/docs', redocExpressMiddleware(redocOptions));

  await app.listen(4000);
}
bootstrap();
