import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Brackets, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderModeEnum } from '../enums/order-mode-enum';
import { OrderStatusEnum } from '../enums/order.status.enum';
import { NotifyDelayedOrderService } from '../services/notify-delayed-order.service';
import { NotifyNewOrderService } from '../services/notify-new-order.service';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        private notifyDelayedOrderService: NotifyDelayedOrderService,
        private notifyNewOrderService: NotifyNewOrderService,
    ) {}

    @Cron('0 */2 * * * *')
    async checkForOpenOrders() {
        const query = this.orderRepository.createQueryBuilder('order');

        query
            .leftJoinAndSelect('order.company', 'company')
            .leftJoin('company.metas', 'meta', "meta.key = 'businessHours'");

        query.where('order.status = :status');

        query.andWhere(
            new Brackets(qb =>
                qb
                    .where(
                        new Brackets(qqb =>
                            qqb
                                .where('order.mode = :mode')
                                .andWhere(
                                    'DATE_ADD(NOW(), INTERVAL 10 MINUTE) >= COMPANY_NEXT_OPEN_DATE(`meta`.`value`, `order`.`createdAt`)',
                                ),
                        ),
                    )
                    .orWhere('order.mode != :mode'),
            ),
        );

        query.setParameters({ status: OrderStatusEnum.WAITING, mode: OrderModeEnum.RESERVED });

        const orders = await query.getMany();

        this.queueNotifications(orders);
    }

    private async queueNotifications(orders: Order[]) {
        // if has no waiting orders
        if (!orders.length) return;

        // queue notifications
        await Promise.all(orders.map(order => this.notifyNewOrderService.execute(order, order.company)));

        // define time limit for
        const limit = 6; // limit (in minutes) for order to be delayed
        const timeLimit = dayjs().subtract(limit, 'minute');

        // filter orders that are delayed
        const delayedOrders = orders.filter(order => {
            const createdAt = dayjs(order.createdAt);
            return createdAt.isBefore(timeLimit);
        });

        if (!delayedOrders.length) return;

        // queue notifications
        await Promise.all(delayedOrders.map(order => this.notifyDelayedOrderService.execute(order, order.company)));
    }
}
