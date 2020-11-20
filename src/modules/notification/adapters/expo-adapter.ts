import { Injectable } from '@nestjs/common';
import { INotificationData } from '../interfaces/notification-data.interface';
import { INotificationAdapter } from '../interfaces/notification-adapter.interface';
import { INotificationToken } from '../interfaces/notification-token.interface';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { configService } from 'src/config/config.service';

@Injectable()
export class ExpoSDKAtapter implements INotificationAdapter {
    private expo: Expo;
    tokenName: string;

    constructor() {
        this.tokenName = 'notification_tokens';

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

        return true;
    }

    //filter valid EXPO tokens
    private filterTokens(tokens: INotificationToken[]) {
        return tokens.filter(token => token.type === 'expo');
    }

    private createMessages(tokens: INotificationToken[], data: INotificationData): ExpoPushMessage[] {
        // Create the messages that you want to send to clents
        const messages: ExpoPushMessage[] = [];

        // create messages
        tokens.forEach(token => {
            // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
            const pushToken = token.token;

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
