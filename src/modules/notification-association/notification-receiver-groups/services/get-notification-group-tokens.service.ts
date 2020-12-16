import { Filter, InjectQueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationToken } from '../../notification/entities/notification-token.entity';
import { NotificationTokenTypeEnum } from '../../notification/enums/notification-token-type.enum';
import { INotificationToken } from '../../notification/interfaces/notification-token.interface';
import { NotificationTokenService } from '../../notification/services/notification-token.service';

@Injectable()
export class GetNotificationGroupTokensService {
    constructor(@InjectQueryService(NotificationToken) private notificationService: NotificationTokenService) {}

    async execute(userIds: User['id'][], types?: NotificationTokenTypeEnum[]): Promise<INotificationToken[]> {
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
