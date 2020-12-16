import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';
import { INotificationData } from './notification-data.interface';
import { INotificationReceivers } from './notification-receivers.interface';

export interface INotificationJobData {
    type?: NotificationTokenTypeEnum[];
    receivers: INotificationReceivers;
    data: INotificationData;
}
