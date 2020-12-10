import { Injectable } from '@nestjs/common';
import { MobileScreenHelper } from 'src/modules/common/helpers/mobile-redirect.helper';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { NotificationGroupsEnum } from 'src/modules/notification-association/notification-receiver-groups/enums/notification-groups.enum';
import { GetNotificationGroupTokensService } from 'src/modules/notification-association/notification-receiver-groups/services/get-notification-group.service';
import { NotificationTokenTypeEnum } from 'src/modules/notification-association/notification/enums/notification-token-type.enum';
import {
    INotificationData,
    INotificationMessage,
} from 'src/modules/notification-association/notification/interfaces/notification-data.interface';
import { QueueNotificationService } from 'src/modules/notification-association/notification/services/queue-notification.service';
import { Order } from 'src/modules/order-association/order/entities/order.entity';
import { Delivery } from '../entities/delivery.entity';

@Injectable()
export class NotifyDeliveryMenService {
    constructor(
        private getNotificationGroupTokensService: GetNotificationGroupTokensService,
        private queueNotificationService: QueueNotificationService,
        private mobileScreenHelper: MobileScreenHelper,
    ) {}

    async execute(delivery: Delivery, order: Order, company: Company) {
        const tokens = await this.getNotificationGroupTokensService.execute(NotificationGroupsEnum.DELIVERY_MAN, null, [
            NotificationTokenTypeEnum.MOBILE,
        ]);

        const message: INotificationMessage = {
            title: `Há um novo pedido (#${delivery.id}) a sua espera`,
            body: `${company.displayName} tem um pedido (#${order.id}) pronto para entrega. Vá até o estabelecimento para retirar a encomenda.`,
        };

        const notificationData: INotificationData = {
            ...message,
            data: {
                redirect: this.mobileScreenHelper.find('deliveries'),
                alertData: message,
            },
        };

        this.queueNotificationService.execute(tokens, notificationData);
    }
}
