import { Job } from 'bull';

import { Processor, Process } from '@nestjs/bull';
import { SendEmailService } from '../services/send-email.service';

@Processor('mail')
export class SendEmailConsumer {
    constructor(private readonly sendMailService: SendEmailService) {}

    @Process()
    execute(job: Job) {
        return this.sendMailService.execute(job.data.template, job.data.context);
    }
}
