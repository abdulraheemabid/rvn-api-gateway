import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { MsFormModule } from './ms-form/ms-form.module';

@Module({
  imports: [MsFormModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule { }
