import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';

export interface INotificationToken {
    value: string;
    type: NotificationTokenTypeEnum;
}
