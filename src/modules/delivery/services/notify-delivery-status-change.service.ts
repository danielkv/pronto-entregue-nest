import { Injectable } from '@nestjs/common';
import { MobileScreenHelper } from 'src/modules/common/helpers/mobile-redirect.helper';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { Delivery } from 'src/modules/delivery/entities/delivery.entity';
import { SelectNotificationReceiverService } from 'src/modules/notification-association/notification-receiver-groups/services/select-receiver-user-ids.service';
import {
    INotificationData,
    INotificationMessage,
} from 'src/modules/notification-association/notification/interfaces/notification-data.interface';
import { QueueNotificationService } from 'src/modules/notification-association/notification/services/queue-notification.service';
import { Order } from 'src/modules/order-association/order/entities/order.entity';
import { StatusLabelsHelper } from '../helpers/status-labels.helper';

@Injectable()
export class NotifyDeliveryChangeStatusService {
    constructor(
        private statusLabelsHelper: StatusLabelsHelper,
        private selectNotificationReceiverService: SelectNotificationReceiverService,
        private queueNotificationService: QueueNotificationService,
        private mobileScreenHelper: MobileScreenHelper,
    ) {}

    async execute(delivery: Delivery, order: Order, company: Company) {
        // spread data
        const orderId = delivery.orderId;
        const companyId = order.companyId;
        const deliveryId = delivery.id;

        // get status readeble (slug => label)
        const statusLabel = this.statusLabelsHelper.get(delivery.status);

        const message: INotificationMessage = {
            title: 'Status alterado',
            body: `O entregador alterou o status da entrega do pedido #${orderId} para ${statusLabel.default}`,
        };

        const notificationData: INotificationData = {
            ...message,
            data: {
                action: 'statusChange',
                orderId: orderId,
                newStatus: delivery.status,
                companyId: companyId,
                deliveryId: deliveryId,
                redirect: this.mobileScreenHelper.find('companyOrders', { refetchOrders: true }),
                alertData: message,
            },
        };

        // queue notifications
        this.queueNotificationService.execute({ group: { name: 'company', id: company.id } }, notificationData);

        return false;
    }
}
