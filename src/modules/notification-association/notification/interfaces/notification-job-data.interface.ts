import { INotificationData } from './notification-data.interface';
import { INotificationToken } from './notification-token.interface';

export interface INotificationJobData {
    tokens: INotificationToken[];
    data: INotificationData;
}
