import { Filter, InjectQueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { NotificationToken } from '../../notification/entities/notification-token.entity';
import { NotificationTokenTypeEnum } from '../../notification/enums/notification-token-type.enum';
import { INotificationToken } from '../../notification/interfaces/notification-token.interface';
import { NotificationTokenService } from '../../notification/services/notification-token.service';
import { NotificationGroupsEnum } from '../enums/notification-groups.enum';
import { GetNotificationGroupUserIdsService } from './get-notification-group-user-ids.service';

@Injectable()
export class GetNotificationGroupTokensService {
    constructor(
        private getNotificationGroupUserIdsService: GetNotificationGroupUserIdsService,
        @InjectQueryService(NotificationToken) private notificationService: NotificationTokenService,
    ) {}

    async execute(
        groupName: NotificationGroupsEnum,
        groupIdentificator?: string | number,
        types?: NotificationTokenTypeEnum[],
    ): Promise<INotificationToken[]> {
        const userIds = await this.getNotificationGroupUserIdsService.execute(groupName, groupIdentificator);

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
}
