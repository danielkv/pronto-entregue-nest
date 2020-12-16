import { Injectable } from '@nestjs/common';
import { MobileScreenHelper } from 'src/modules/common/helpers/mobile-redirect.helper';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { SelectNotificationReceiverService } from 'src/modules/notification-association/notification-receiver-groups/services/select-receiver-user-ids.service';
import {
    INotificationData,
    INotificationMessage,
} from 'src/modules/notification-association/notification/interfaces/notification-data.interface';
import { QueueNotificationService } from 'src/modules/notification-association/notification/services/queue-notification.service';
import { Order } from '../entities/order.entity';

/**
 * Notifica resposáveis por pedidos, quando pedido está aguardando
 */

@Injectable()
export class NotifyDelayedOrderService {
    constructor(
        private queueNotificationService: QueueNotificationService,
        private selectNotificationReceiverService: SelectNotificationReceiverService,
        private mobileScreenHelper: MobileScreenHelper,
    ) {}

    async execute(order: Order, company: Company) {
        const orderId = order.id;
        const companyId = order.companyId;

        const message: INotificationMessage = {
            title: 'Pedido não aberto!',
            body: `Há um pedido (#${orderId}) aguardando em ${company.displayName}`,
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

        // queue notifications
        this.queueNotificationService.execute({ group: { name: 'master' } }, notificationData);
    }
}
