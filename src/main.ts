import { CommonLoggingInterceptor, CommonResponseWrapperInterceptor, CommonExceptionFilter } from '@abdulraheemabid/rvn-nest-shared';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new CommonLoggingInterceptor());
  app.useGlobalInterceptors(new CommonResponseWrapperInterceptor());
  app.useGlobalFilters(new CommonExceptionFilter());

  await app.listen(3000);
}
bootstrap();
