import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';
import { INotificationData } from './notification-data.interface';

export interface INotificationJobData {
    type?: NotificationTokenTypeEnum[];
    userIds: User['id'][];
    data: INotificationData;
}
