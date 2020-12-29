import { Injectable } from '@nestjs/common';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { Order } from '../entities/order.entity';
import { OrderModeEnum } from '../enums/order-mode-enum';
import { OrderNotifierType } from '../types/order-notifier.type';
import { NotifyDelayedSimpleOrderService } from './notify-delayed-simple-order.service';
import { NotifyDelayedScheduledOrderService } from './notify-delayed-scheduled-order.service';
import { NotifyDelayedReservedOrderService } from './notify-delayed-reserved-order.service';

@Injectable()
export class NotifyDelayedOrderService {
    orderModeNotifier: OrderNotifierType;

    constructor(
        private notifyDelayedScheduledOrderService: NotifyDelayedScheduledOrderService,
        private notifyDelayedReservedOrderService: NotifyDelayedReservedOrderService,
        private notifyDelayedSimpleOrderService: NotifyDelayedSimpleOrderService,
    ) {
        this.orderModeNotifier = {
            [OrderModeEnum.RESERVED]: this.notifyDelayedReservedOrderService,
            [OrderModeEnum.SCHEDULED]: this.notifyDelayedScheduledOrderService,
            [OrderModeEnum.SIMPLE]: this.notifyDelayedSimpleOrderService,
        };
    }

    async execute(order: Order, company: Company) {
        this.orderModeNotifier[order.mode].send(order, company);
    }
}
