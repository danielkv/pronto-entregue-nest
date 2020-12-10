import { Injectable, Logger } from '@nestjs/common';
import { configService } from 'src/config/config.service';
import { ExpoSDKAtapter } from '../adapters/expo-adapter';
import { FCMAdapter } from '../adapters/fcm-adapter';
import { INotificationData } from '../interfaces/notification-data.interface';
import { INotificationToken } from '../interfaces/notification-token.interface';

@Injectable()
export class SendNotificationService {
    private logger = new Logger('Notification Base');

    constructor(private expoAdapter: ExpoSDKAtapter, private fcmAdapter: FCMAdapter) {}

    async execute(tokens: INotificationToken[], data: INotificationData): Promise<boolean> {
        // check if notifications are enabled
        if (configService.getValue('SEND_NOTIFICATIONS') === 'false') {
            this.logger.warn(`Notificações desabilidatas: ${tokens.length} não enviadas`);
            this.logger.log(`Título: ${data.title} | Mensagem: ${data.body}`);

            // stop sending execution
            return false;
        }

        // send mobile messages
        await this.expoAdapter.send(tokens, data);

        // send desktop messages
        await this.fcmAdapter.send(tokens, data);

        return true;
    }
}
