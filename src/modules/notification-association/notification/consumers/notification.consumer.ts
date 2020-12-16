import { Job } from 'bull';
import { INotificationJobData } from '../interfaces/notification-job-data.interface';
import { SendNotificationService } from '../services/send-notification.service';
import { Processor, Process } from '@nestjs/bull';

@Processor('notification')
export class SendNotificationConsumer {
    constructor(private sendNotificationService: SendNotificationService) {}

    @Process()
    execute(job: Job<INotificationJobData>) {
        return this.sendNotificationService.execute(job.data.receivers, job.data.data);
    }
}
