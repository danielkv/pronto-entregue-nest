import { Filter, InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { NotificationToken } from '../../notification/entities/notification-token.entity';
import { NotificationTokenTypeEnum } from '../../notification/enums/notification-token-type.enum';
import { INotificationToken } from '../../notification/interfaces/notification-token.interface';
import { NotificationTokenService } from '../../notification/services/notification-token.service';
import { NotificationReceiver } from '../entities/notification-receiver.entity';
import { NotificationGroupsEnum } from '../enums/notification-groups.enum';

@Injectable()
export class GetNotificationGroupTokensService {
    constructor(
        @InjectQueryService(NotificationReceiver)
        private notificationReceiverService: QueryService<NotificationReceiver>,
        @InjectQueryService(NotificationToken) private notificationService: NotificationTokenService,
    ) {}

    async execute(
        groupName: NotificationGroupsEnum,
        groupIdentificator?: string | number,
        types?: NotificationTokenTypeEnum[],
    ): Promise<INotificationToken[]> {
        const groupId = this.buildGroudIdString(groupName, groupIdentificator);

        const notificationGroup = await this.notificationReceiverService.query({
            filter: { groupId: { eq: groupId } },
        });
        const userIds = notificationGroup.map(receiver => receiver.userId);

        if (!userIds.length) return [];

        const notificationTokenFilter = this.builtNotificationTokenFilter(userIds, types);

        const notificationTokens = await this.notificationService.query({ filter: notificationTokenFilter });

        return notificationTokens;
    }

    private builtNotificationTokenFilter(
        userIds: number[],
        types?: NotificationTokenTypeEnum[],
    ): Filter<NotificationToken> {
        const filter: Filter<NotificationToken> = { userId: { in: userIds } };

        if (types?.length) filter.type = { in: types };

        return filter;
    }

    private buildGroudIdString(groupName: NotificationGroupsEnum, groupIdentificator?: string | number): string {
        if (!groupIdentificator) return String(groupName);

        return `${String(groupName)}:${String(groupIdentificator)}`;
    }
}
