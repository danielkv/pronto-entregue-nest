import { Injectable, Logger } from '@nestjs/common';
import { INotificationData } from '../interfaces/notification-data.interface';
import { INotificationAdapter } from '../interfaces/notification-adapter.interface';
import { INotificationToken } from '../interfaces/notification-token.interface';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { configService } from 'src/config/config.service';
import { NotificationAdapter } from '../abstracts/notification-adapter.abstract';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';

@Injectable()
export class ExpoSDKAtapter extends NotificationAdapter implements INotificationAdapter {
    private expo: Expo;
    private logger = new Logger('Browser Notification');
    readonly type: string;

    constructor() {
        super();

        this.type = NotificationTokenTypeEnum.MOBILE;
        this.expo = new Expo({ accessToken: configService.getValue('EXPO_ACCESS_TOKEN') });
    }

    async send(tokens: INotificationToken[], data: INotificationData): Promise<boolean> {
        // filter valid tokens
        const validTokens = this.filterTokens(tokens);

        // check tokens length
        if (!validTokens.length) return false;

        const messages = this.createMessages(validTokens, data);
        const chunks = this.expo.chunkPushNotifications(messages);
        const tickets = [];

        // Send the chunks to the Expo push notification service.
        for (const chunk of chunks) {
            const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        }

        this.logger.log(`${validTokens.length} mobile notifications sent`, 'Mobile Notification');

        return true;
    }

    private createMessages(tokens: INotificationToken[], data: INotificationData): ExpoPushMessage[] {
        // Create the messages that you want to send to clents
        const messages: ExpoPushMessage[] = [];

        // create messages
        tokens.forEach(token => {
            // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
            const pushToken = token.value;

            if (!Expo.isExpoPushToken(pushToken)) {
                throw new Error('Push token inválido');
            }

            messages.push({
                to: pushToken,
                priority: 'high',
                channelId: 'Standard',
                sound: 'default',
                ...data,
            });
        });

        return messages;
    }
}
