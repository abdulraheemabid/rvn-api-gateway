import { FormClient } from '@abdulraheemabid/rvn-shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MsFormService extends FormClient {
    constructor(@Inject('RVN_MS_FORM_CLIENT') private client: ClientProxy, @Inject("timeout") private timeoutForMS: number) {
        super(client, new Logger(MsFormService.name), timeoutForMS);
    }
}
