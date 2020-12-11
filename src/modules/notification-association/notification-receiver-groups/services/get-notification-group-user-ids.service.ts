import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationReceiver } from '../entities/notification-receiver.entity';
import { NotificationGroupsEnum } from '../enums/notification-groups.enum';

@Injectable()
export class GetNotificationGroupUserIdsService {
    constructor(
        @InjectQueryService(NotificationReceiver)
        private notificationReceiverService: QueryService<NotificationReceiver>,
    ) {}

    async execute(groupName: NotificationGroupsEnum, groupIdentificator?: string | number): Promise<User['id'][]> {
        const groupId = this.buildGroudIdString(groupName, groupIdentificator);

        const notificationGroup = await this.notificationReceiverService.query({
            filter: { groupId: { eq: groupId } },
        });
        const userIds = notificationGroup.map(receiver => receiver.userId);

        return userIds;
    }

    private buildGroudIdString(groupName: NotificationGroupsEnum, groupIdentificator?: string | number): string {
        if (!groupIdentificator) return String(groupName);

        return `${String(groupName)}:${String(groupIdentificator)}`;
    }
}
