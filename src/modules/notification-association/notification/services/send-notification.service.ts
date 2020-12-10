import { Injectable } from '@nestjs/common';
import { configService } from 'src/config/config.service';
import { ExpoSDKAtapter } from '../adapters/expo-adapter';
import { FCMAdapter } from '../adapters/fcm-adapter';
import { INotificationData } from '../interfaces/notification-data.interface';
import { INotificationToken } from '../interfaces/notification-token.interface';

@Injectable()
export class SendNotificationService {
    constructor(private expoAdapter: ExpoSDKAtapter, private fcmAdapter: FCMAdapter) {}

    async execute(tokens: INotificationToken[], data: INotificationData): Promise<boolean> {
        if (configService.getValue('SEND_NOTIFICATIONS') === 'false') return false;

        // send mobile messages
        await this.expoAdapter.send(tokens, data);

        // send desktop messages
        await this.fcmAdapter.send(tokens, data);

        return true;
    }
}
