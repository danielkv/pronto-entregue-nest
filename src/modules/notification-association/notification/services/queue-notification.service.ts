import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';
import { INotificationData } from '../interfaces/notification-data.interface';
import { INotificationJobData } from '../interfaces/notification-job-data.interface';
import { INotificationReceivers } from '../interfaces/notification-receivers.interface';

@Injectable()
export class QueueNotificationService {
    constructor(@InjectQueue('notification') private notificationQueue: Queue<INotificationJobData>) {}

    execute(receivers: INotificationReceivers, data: INotificationData) {
        const notificationData: INotificationJobData = {
            receivers,
            data,
        };

        this.notificationQueue.add(notificationData);
    }
}
