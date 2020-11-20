import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { INotificationData } from '../../notification/interfaces/notification-data.interface';
import { INotificationToken } from '../../notification/interfaces/notification-token.interface';

@Injectable()
export class QueueNotificationService {
    constructor(@InjectQueue('notification') private notificationQueue: Queue) {}

    execute(tokens: INotificationToken[], data: INotificationData) {
        const notificationData = {
            tokens,
            data,
        };

        this.notificationQueue.add(notificationData);
    }
}
