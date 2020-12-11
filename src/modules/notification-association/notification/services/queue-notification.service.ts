import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';
import { INotificationData } from '../interfaces/notification-data.interface';
import { INotificationJobData } from '../interfaces/notification-job-data.interface';

@Injectable()
export class QueueNotificationService {
    constructor(@InjectQueue('notification') private notificationQueue: Queue<INotificationJobData>) {}

    execute(userIds: User['id'][], data: INotificationData, type?: NotificationTokenTypeEnum[]) {
        const notificationData: INotificationJobData = {
            type,
            userIds,
            data,
        };

        this.notificationQueue.add(notificationData);
    }
}
