import { Injectable } from '@nestjs/common';
import { MobileScreenHelper } from 'src/modules/common/helpers/mobile-redirect.helper';
import { Delivery } from 'src/modules/delivery/entities/delivery.entity';
import { NotificationGroupsEnum } from 'src/modules/notification-association/notification-receiver-groups/enums/notification-groups.enum';
import { GetNotificationGroupTokensService } from 'src/modules/notification-association/notification-receiver-groups/services/get-notification-group.service';
import { INotificationData } from 'src/modules/notification-association/notification/interfaces/notification-data.interface';
import { QueueNotificationService } from 'src/modules/notification-association/notification/services/queue-notification.service';
import { Order } from 'src/modules/order-association/order/entities/order.entity';
import { StatusLabelsHelper } from '../helpers/status-labels.helper';

@Injectable()
export class NotifyDeliveryChangeStatusService {
    constructor(
        private statusLabelsHelper: StatusLabelsHelper,
        private getNotificationGroupTokensService: GetNotificationGroupTokensService,
        private queueNotificationService: QueueNotificationService,
        private mobileScreenHelper: MobileScreenHelper,
    ) {}

    async execute(delivery: Delivery, order: Order) {
        // spread data
        const orderId = delivery.orderId;
        const companyId = order.companyId;
        const deliveryId = delivery.id;

        // get status readeble (slug => label)
        const statusLabel = this.statusLabelsHelper.get(delivery.status);

        const notificationData: INotificationData = {
            title: 'Status alterado',
            body: `O entregador alterou o status da entrega do pedido #${orderId} para ${statusLabel}`,
            data: {
                action: 'statusChange',
                orderId: orderId,
                newStatus: delivery.status,
                companyId: companyId,
                deliveryId: deliveryId,
                redirect: this.mobileScreenHelper.find('companyOrders', { refetchOrders: true }),
                alertData: {
                    title: 'Status alterado',
                    body: `O entregador alterou o status da entrega do pedido #${orderId} para ${statusLabel}`,
                },
            },
        };

        // get tokens
        const tokens = await this.getNotificationGroupTokensService.execute(NotificationGroupsEnum.COMPANY, companyId);

        this.queueNotificationService.execute(tokens, notificationData);

        return false;
    }
}
