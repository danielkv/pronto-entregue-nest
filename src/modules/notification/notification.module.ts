import { Module } from '@nestjs/common';

import { UserMetaModule } from '../user-association/user-meta/user-meta.module';
import { ExpoSDKAtapter } from './adapters/expo-adapter';
import { FCMAdapter } from './adapters/fcm-adapter';
import { SendNotificationService } from './services/send-notification.service';

@Module({
    imports: [UserMetaModule],
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
