import { Injectable } from '@nestjs/common';
import { MobileScreenHelper } from 'src/modules/common/helpers/mobile-redirect.helper';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import {
    INotificationData,
    INotificationMessage,
} from 'src/modules/notification-association/notification/interfaces/notification-data.interface';
import { QueueNotificationService } from 'src/modules/notification-association/notification/services/queue-notification.service';
import { Order } from 'src/modules/order-association/order/entities/order.entity';
import { Delivery } from '../entities/delivery.entity';

@Injectable()
export class NotifyDelayedDeliveryService {
    constructor(
        private queueNotificationService: QueueNotificationService,
        private mobileScreenHelper: MobileScreenHelper,
    ) {}

    async execute(delivery: Delivery, order: Order, company: Company) {
        const message: INotificationMessage = {
            title: `Nenhum entregador retirou a entrega (#${delivery.id}).`,
            body: `Pedido #${order.id} de ${company.displayName} não foi retirado.`,
        };

        const notificationData: INotificationData = {
            ...message,
            data: {
                redirect: this.mobileScreenHelper.find('deliveries'),
                alertData: message,
            },
        };

        this.queueNotificationService.execute({ group: { name: 'master' } }, notificationData);
    }
}
