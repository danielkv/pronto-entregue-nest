import { InjectQueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { On } from 'nest-event';
import { NotificationToken } from 'src/modules/notification-association/notification/entities/notification-token.entity';
import { NotificationTokenService } from 'src/modules/notification-association/notification/services/notification-token.service';
import { QueueNotificationService } from 'src/modules/notification-association/notification/services/queue-notification.service';
import { ICreateOrderEvent } from '../interfaces/create-order-event.interface';

@Injectable()
export class OrderListener {
    constructor(
        @InjectQueryService(NotificationToken) private notificationTokenService: NotificationTokenService,
        private queueNotificationService: QueueNotificationService,
    ) {}

    @On('createOrder')
    async onOrderCreated({ order }: ICreateOrderEvent) {
        //const tokens = await this.notificationTokenService.query({ filter: { userId: { eq: order.userId } } });
        //this.queueNotificationService.execute(tokens, { title: 'teste', body: 'body', subtitle: 'subtitulo' });
    }
}
