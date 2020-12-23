import { Injectable } from '@nestjs/common';
import { MobileScreenHelper } from 'src/modules/common/helpers/mobile-redirect.helper';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import {
    INotificationData,
    INotificationMessage,
} from 'src/modules/notification-association/notification/interfaces/notification-data.interface';
import { QueueNotificationService } from 'src/modules/notification-association/notification/services/queue-notification.service';
import { Order } from '../entities/order.entity';
import { INotifyOrderType } from '../interfaces/notify-order-type.interface';

@Injectable()
export class NotifyNewSimpleOrderService implements INotifyOrderType {
    constructor(
        private queueNotificationService: QueueNotificationService,
        private mobileScreenHelper: MobileScreenHelper,
    ) {}

    async send(order: Order, company: Company) {
        const orderId = order.id;
        const companyId = order.companyId;

        const message: INotificationMessage = {
            title: 'Novo pedido!',
            body: `Há um pedido (#${orderId}) aguardado em ${company.displayName}`,
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

        // queue notification
        this.queueNotificationService.execute({ group: { name: 'company', id: company.id } }, notificationData);
    }
}
