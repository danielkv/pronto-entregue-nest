import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';

export interface INotificationToken {
    token: string;
    type: NotificationTokenTypeEnum;
}
