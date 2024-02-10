import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({ type: VersioningType.URI });

  const config = new DocumentBuilder()
    .setTitle('IMKDW Dev API')
    .setDescription('IMKDW Dev 블로그의 API 문서')
    .setVersion('1.0')
    .addTag('IMKDW Dev')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
