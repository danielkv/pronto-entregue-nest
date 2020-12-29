import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { IsNull, Repository } from 'typeorm';
import { Delivery } from '../entities/delivery.entity';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { NotifyDelayedDeliveryService } from '../services/notify-delayed-delivery.service';
import { NotifyDeliveryMenService } from '../services/notify-delivery-men.service';

@Injectable()
export class DeliveryScheduler {
    constructor(
        @InjectRepository(Delivery) private deliveryRepository: Repository<Delivery>,
        private notifyDelayedDeliveryService: NotifyDelayedDeliveryService,
        private notifyDeliveryMenService: NotifyDeliveryMenService,
    ) {}

    @Cron('30 */2 * * * *')
    async checkForOpenDeliveries() {
        const nonFilteredDeliveries = await this.deliveryRepository.find({
            where: { status: DeliveryStatusEnum.WAITING_DELIVERY, deliveryManId: IsNull() },
            relations: ['company', 'order'],
        });

        const deliveries = nonFilteredDeliveries.filter(delivery => delivery?.company && delivery?.order);

        // if has no waiting deliveries
        if (!deliveries.length) return;

        // queue notifications
        await Promise.all(
            deliveries.map(delivery =>
                this.notifyDeliveryMenService.execute(delivery, delivery.order, delivery.company),
            ),
        );

        // define time limit for
        const limit = 7; // limit (in minutes) for order to be delayed
        const timeLimit = dayjs().subtract(limit, 'minute');

        // filter deliveries that are delayed
        const delayedDeliveries = deliveries.filter(order => {
            const createdAt = dayjs(order.createdAt);
            return createdAt.isBefore(timeLimit);
        });

        if (!delayedDeliveries.length) return;

        // queue notifications
        await Promise.all(
            delayedDeliveries.map(delivery =>
                this.notifyDelayedDeliveryService.execute(delivery, delivery.order, delivery.company),
            ),
        );
    }
}
