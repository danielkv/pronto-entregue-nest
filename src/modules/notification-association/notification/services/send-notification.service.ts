import { Filter, InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable, Logger } from '@nestjs/common';
import { configService } from 'src/config/config.service';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { ExpoSDKAtapter } from '../adapters/expo-adapter';
import { FCMAdapter } from '../adapters/fcm-adapter';
import { NotificationToken } from '../entities/notification-token.entity';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';
import { INotificationData } from '../interfaces/notification-data.interface';

@Injectable()
export class SendNotificationService {
    private logger = new Logger('Notification Base');

    constructor(
        private expoAdapter: ExpoSDKAtapter,
        private fcmAdapter: FCMAdapter,
        @InjectQueryService(NotificationToken) private notificationTokenService: QueryService<NotificationToken>,
    ) {}

    async execute(
        userIds: User['id'][],
        data: INotificationData,
        type?: NotificationTokenTypeEnum[],
    ): Promise<boolean> {
        const filter: Filter<NotificationToken> = {
            userId: { in: userIds },
        };
        if (type?.length) filter.type = { in: type };

        const tokens = userIds.length ? await this.notificationTokenService.query({ filter }) : [];

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
