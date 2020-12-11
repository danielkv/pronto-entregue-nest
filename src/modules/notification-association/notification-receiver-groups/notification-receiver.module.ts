import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { NotificationReceiverDTO } from './dtos/company-notification.dto';
import { NotificationReceiver } from './entities/notification-receiver.entity';
import { GetNotificationGroupTokensService } from './services/get-notification-group-tokens.service';
import { GetNotificationGroupUserIdsService } from './services/get-notification-group-user-ids.service';

const notificationReceiverTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([NotificationReceiver]);

@Module({
    imports: [
        NotificationModule,
        notificationReceiverTypeOrmModule,
        NestjsQueryGraphQLModule.forFeature({
            imports: [notificationReceiverTypeOrmModule],
            resolvers: [{ DTOClass: NotificationReceiverDTO, EntityClass: NotificationReceiver }],
        }),
    ],
    providers: [
        // services
        GetNotificationGroupTokensService,
        GetNotificationGroupUserIdsService,
    ],
    exports: [GetNotificationGroupTokensService, GetNotificationGroupUserIdsService],
})
export class NotificationReceiverGroupModule {}
