import { CommonLoggingInterceptor, CommonResponseWrapperInterceptor, CommonExceptionFilter } from '@abdulraheemabid/rvn-nest-shared';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new CommonLoggingInterceptor());
  app.useGlobalInterceptors(new CommonResponseWrapperInterceptor());
  app.useGlobalFilters(new CommonExceptionFilter());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Project Raven API Gateway')
    .setDescription('Sets of APIs to use raven framework')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
