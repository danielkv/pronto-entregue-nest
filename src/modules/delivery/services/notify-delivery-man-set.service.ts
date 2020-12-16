import { Injectable } from '@nestjs/common';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { NotificationTokenTypeEnum } from 'src/modules/notification-association/notification/enums/notification-token-type.enum';
import {
    INotificationData,
    INotificationMessage,
} from 'src/modules/notification-association/notification/interfaces/notification-data.interface';
import { QueueNotificationService } from 'src/modules/notification-association/notification/services/queue-notification.service';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { Delivery } from '../entities/delivery.entity';

@Injectable()
export class NotifyDeliveryMenSetService {
    constructor(private queueNotificationService: QueueNotificationService) {}

    async execute(delivery: Delivery, user: User, company: Company) {
        const message: INotificationMessage = {
            title: `Um entregador aceitou o pedido de ${company.displayName}`,
            body: `O entregador ${user.firstName} irá retirar o pedido #${delivery.orderId} em instantes`,
        };

        // generate data
        const notificationData: INotificationData = {
            ...message,
            data: {
                orderId: delivery.orderId,
                deliveryManId: delivery.deliveryManId,
                deliveryId: delivery.id,
            },
        };

        this.queueNotificationService.execute(
            {
                group: { name: 'deliveryMan' },
                type: [NotificationTokenTypeEnum.MOBILE],
            },
            notificationData,
        );
    }
}
