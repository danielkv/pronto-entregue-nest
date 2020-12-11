import { Injectable } from '@nestjs/common';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { NotificationGroup } from '../enums/notification-groups.enum';
import { GetNotificationGroupUserIdsService } from './get-notification-group-user-ids.service';

@Injectable()
export class SelectNotificationReceiverService {
    constructor(private getNotificationGroupUserIdsService: GetNotificationGroupUserIdsService) {}

    execute(groupName: NotificationGroup, company: Company): Promise<User['id'][]> {
        if (groupName === 'deliveryMan') return this.getNotificationGroupUserIdsService.execute(groupName);

        return this.getNotificationGroupUserIdsService.execute(groupName, company.id);
    }
}
