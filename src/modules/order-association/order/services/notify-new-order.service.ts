import { Injectable } from '@nestjs/common';
import { MobileScreenHelper } from 'src/modules/common/helpers/mobile-redirect.helper';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { NotificationGroupsEnum } from 'src/modules/notification-association/notification-receiver-groups/enums/notification-groups.enum';
import { GetNotificationGroupUserIdsService } from 'src/modules/notification-association/notification-receiver-groups/services/get-notification-group-user-ids.service';
import {
    INotificationData,
    INotificationMessage,
} from 'src/modules/notification-association/notification/interfaces/notification-data.interface';
import { QueueNotificationService } from 'src/modules/notification-association/notification/services/queue-notification.service';
import { Order } from '../entities/order.entity';

@Injectable()
export class NotifyNewOrderService {
    constructor(
        private queueNotificationService: QueueNotificationService,
        private getNotificationGroupUserIdsService: GetNotificationGroupUserIdsService,
        private mobileScreenHelper: MobileScreenHelper,
    ) {}

    async execute(order: Order, company: Company) {
        const orderId = order.id;
        const companyId = order.companyId;

        const message: INotificationMessage = {
            title: 'Novo pedido!',
            body: `Há uma pedido (#${orderId}) aguardado em ${company.displayName}`,
        };

        const notificationData: INotificationData = {
            ...message,
            data: {
                action: 'orderCreated',
                variant: 'warning',
                orderId,
                companyId,
                redirect: this.mobileScreenHelper.find('companyOrders', {
                    refetchOrders: true,
                }),
                alertData: message,
            },
        };

        // get company users desktop tokens
        const userIds = await this.getNotificationGroupUserIdsService.execute(
            NotificationGroupsEnum.COMPANY,
            companyId,
        );

        this.queueNotificationService.execute(userIds, notificationData);
    }
}
