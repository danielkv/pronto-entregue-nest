import { INotificationToken } from '../interfaces/notification-token.interface';

export abstract class NotificationAdapter {
    readonly type: string;

    //filter valid tokens
    protected filterTokens(tokens: INotificationToken[]) {
        return tokens.filter(token => token.type === this.type);
    }
}
