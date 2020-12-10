import { Injectable, Logger } from '@nestjs/common';
import { INotificationData } from '../interfaces/notification-data.interface';
import { INotificationAdapter } from '../interfaces/notification-adapter.interface';
import { INotificationToken } from '../interfaces/notification-token.interface';
import fbAdmin, { messaging } from 'firebase-admin';
import { resolve } from 'path';
import { isString, toString } from 'lodash';
import { NotificationAdapter } from '../abstracts/notification-adapter.abstract';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';

@Injectable()
export class FCMAdapter extends NotificationAdapter implements INotificationAdapter {
    private messaging: messaging.Messaging;
    private logger = new Logger('Browser Notification');
    readonly type: string;

    constructor() {
        super();

        this.type = NotificationTokenTypeEnum.BROWSER;

        fbAdmin.initializeApp({
            credential: fbAdmin.credential.cert(resolve(__dirname, '..', '..', '..', '..', '..', 'fb-privatekey.json')),
            databaseURL: 'https://pronto-entregue.firebaseio.com',
        });

        this.messaging = fbAdmin.messaging();
    }

    async send(tokens: INotificationToken[], data: INotificationData): Promise<boolean> {
        // filter valid tokens
        const validTokens = this.filterTokens(tokens);

        // check tokens length
        if (!validTokens.length) return false;

        // create message
        const message = this.createMessage(validTokens, data);

        // send messages
        await this.messaging.sendMulticast(message);

        this.logger.log(`${validTokens.length} mobile notifications sent`, 'Mobile Notification');

        return true;
    }

    private createMessage(tokens: INotificationToken[], data: INotificationData): messaging.MulticastMessage {
        //normalize data
        if (data.data) {
            Object.keys(data.data).map(key => {
                const value = data.data[key];
                if (!isString(value)) data.data[key] = toString(value);
            });
        }

        // Create message that you want to send to clients
        const message: messaging.MulticastMessage = {
            tokens: tokens.map(token => token.value),
            notification: {
                title: data.title,
                body: data.body,
            },
            webpush: {
                headers: {
                    Urgency: 'high',
                },
                notification: {
                    icon: 'https://www.prontoentregue.com.br/icon-bkp.png',
                },
            },
            data: data.data,
        };

        return message;
    }
}
