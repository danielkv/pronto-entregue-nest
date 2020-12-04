import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { INotificationData } from '../interfaces/notification-data.interface';
import { INotificationJobData } from '../interfaces/notification-job-data.interface';
import { INotificationToken } from '../interfaces/notification-token.interface';

@Injectable()
export class QueueNotificationService {
    constructor(@InjectQueue('notification') private notificationQueue: Queue<INotificationJobData>) {}

    execute(tokens: INotificationToken[], data: INotificationData) {
        const notificationData: INotificationJobData = {
            tokens,
            data,
        };

        this.notificationQueue.add(notificationData);
    }
}
