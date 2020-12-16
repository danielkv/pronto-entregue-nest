import { Filter, InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable, Logger } from '@nestjs/common';
import { configService } from 'src/config/config.service';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { SelectNotificationReceiverService } from '../../notification-receiver-groups/services/select-receiver-user-ids.service';
import { ExpoSDKAtapter } from '../adapters/expo-adapter';
import { FCMAdapter } from '../adapters/fcm-adapter';
import { NotificationToken } from '../entities/notification-token.entity';
import { INotificationData } from '../interfaces/notification-data.interface';
import { INotificationReceivers } from '../interfaces/notification-receivers.interface';

@Injectable()
export class SendNotificationService {
    private logger = new Logger('Notification Base');

    constructor(
        private expoAdapter: ExpoSDKAtapter,
        private fcmAdapter: FCMAdapter,
        private selectNotificationReceiverService: SelectNotificationReceiverService,
        @InjectQueryService(NotificationToken) private notificationTokenService: QueryService<NotificationToken>,
    ) {}

    async execute(receivers: INotificationReceivers, data: INotificationData): Promise<boolean> {
        const userIds = await this.getIdsFromReceivers(receivers);

        const tokens = await this.getTokens(userIds, receivers);

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

    private async getTokens(userIds: User['id'][], receivers: INotificationReceivers) {
        const filter = this.getFilters(userIds, receivers);

        const tokens = userIds.length ? await this.notificationTokenService.query({ filter }) : [];

        return tokens;
    }

    private getFilters(userIds: User['id'][], receivers: INotificationReceivers): Filter<NotificationToken> {
        const filter: Filter<NotificationToken> = {
            userId: { in: userIds },
        };
        if (receivers?.type?.length) filter.type = { in: receivers.type };

        return filter;
    }

    private async getIdsFromReceivers(receivers: INotificationReceivers): Promise<User['id'][]> {
        const userIdsFromGroups = receivers.group
            ? await this.selectNotificationReceiverService.execute(receivers.group.name, receivers.group.id)
            : [];

        const usersIds = receivers.userIds || [];

        return [...usersIds, ...userIdsFromGroups];
    }
}
