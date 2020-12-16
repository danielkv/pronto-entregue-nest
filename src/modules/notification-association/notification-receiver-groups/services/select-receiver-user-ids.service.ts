import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationReceiver } from '../entities/notification-receiver.entity';
import { NotificationGroup } from '../enums/notification-groups.enum';

@Injectable()
export class SelectNotificationReceiverService {
    constructor(
        @InjectQueryService(NotificationReceiver)
        private notificationReceiverService: QueryService<NotificationReceiver>,
    ) {}

    async execute(groupName: NotificationGroup, groupIdentificator?: string | number): Promise<User['id'][]> {
        const groupId = this.getGroupId(groupName, groupIdentificator);

        const notificationGroup = await this.notificationReceiverService.query({
            filter: { groupId: { eq: groupId } },
        });
        const userIds = notificationGroup.map(receiver => receiver.userId);

        return userIds;
    }

    private getGroupId(groupName: NotificationGroup, groupIdentificator?: string | number): string {
        if (!groupIdentificator) return String(groupName);

        if (groupName === 'deliveryMan') String(groupName);

        return `${String(groupName)}:${String(groupIdentificator)}`;
    }
}
