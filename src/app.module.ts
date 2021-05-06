import { Module } from '@nestjs/common';
import { MsFormModule } from './ms-form/ms-form.module';

@Module({
  imports: [MsFormModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
