import { INotificationData } from './notification-data.interface';
import { INotificationToken } from './notification-token.interface';

export interface INotificationAdapter {
    readonly type: string;
    send(tokens: INotificationToken[], data: INotificationData): PromiseLike<boolean>;
}
