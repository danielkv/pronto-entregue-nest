import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
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

    //@Cron('0 */2 * * * *')
    async checkForOpenOrders() {
        const orders = await this.orderRepository.find({
            where: { status: OrderStatusEnum.WAITING },
            relations: ['company'],
        });

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
