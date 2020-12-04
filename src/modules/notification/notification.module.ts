import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';

import { ExpoSDKAtapter } from './adapters/expo-adapter';
import { FCMAdapter } from './adapters/fcm-adapter';
import { NotificationTokenInputDTO } from './dtos/notification-token-input.dto';
import { NotificationTokenDTO } from './dtos/notification-token.dto';
import { NotificationToken } from './entities/notification-token.entity';
import { NotificationTokenService } from './services/notification-token.service';
import { SendNotificationService } from './services/send-notification.service';
import { NotificationQueueModule } from './queues/notification.queue';
import { QueueNotificationService } from './services/queue-notification.service';

const notificationTokenTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([NotificationToken]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [notificationTokenTypeOrmModule],
            services: [NotificationTokenService],
            resolvers: [
                {
                    DTOClass: NotificationTokenDTO,
                    CreateDTOClass: NotificationTokenInputDTO,
                    EntityClass: NotificationToken,
                    ServiceClass: NotificationTokenService,
                    create: { many: { disabled: true } },
                    update: { many: { disabled: true } },
                },
            ],
        }),
        notificationTokenTypeOrmModule,
        NotificationQueueModule,
    ],
    providers: [
        // services
        SendNotificationService,
        QueueNotificationService,

        // adapters
        ExpoSDKAtapter,
        FCMAdapter,
    ],
    exports: [QueueNotificationService, NotificationQueueModule, notificationTokenTypeOrmModule],
})
export class NotificationModule {}
