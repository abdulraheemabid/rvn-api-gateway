import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from 'src/config/config.service';
import { MsFormController } from './ms-form.controller';
import { MsFormService } from './ms-form.service';

@Module({
  controllers: [MsFormController],
  providers: [
    MsFormService,
    {
      provide: "timeout",
      useFactory: (configService: ConfigService) => {
        return configService.getMicroServiceCallTimeout();
      },
      inject: [ConfigService]
    }
  ],
  imports: [
    ClientsModule.register([
      { name: 'RVN_MS_FORM_CLIENT', transport: Transport.TCP }
    ])
  ]
})
export class MsFormModule { }
