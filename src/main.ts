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
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
