import { Module } from '@nestjs/common';
import { ExpoSDKAtapter } from './adapters/expo-adapter';
import { FCMAdapter } from './adapters/fcm-adapter';
import { SendNotificationService } from './services/send-notification.service';

@Module({
    providers: [
        // services
        SendNotificationService,

        // adapters
        ExpoSDKAtapter,
        FCMAdapter,
    ],
    exports: [SendNotificationService],
})
export class NotificationModule {}
