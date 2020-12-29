import { Injectable } from '@nestjs/common';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { Order } from '../entities/order.entity';
import { NotifyNewSimpleOrderService } from './notify-new-simple-order.service';
import { NotifyNewReservedOrderService } from './notify-new-reserved-order.service';
import { NotifyNewScheduledOrderService } from './notify-new-scheduled-order.service';
import { OrderModeEnum } from '../enums/order-mode-enum';
import { OrderNotifierType } from '../types/order-notifier.type';

@Injectable()
export class NotifyNewOrderService {
    orderModeNotifier: OrderNotifierType;

    constructor(
        private notifyNewReservedOrderService: NotifyNewReservedOrderService,
        private notifyNewScheduledOrderService: NotifyNewScheduledOrderService,
        private notifyNewSimpleOrderService: NotifyNewSimpleOrderService,
    ) {
        this.orderModeNotifier = {
            [OrderModeEnum.RESERVED]: this.notifyNewReservedOrderService,
            [OrderModeEnum.SCHEDULED]: this.notifyNewScheduledOrderService,
            [OrderModeEnum.SIMPLE]: this.notifyNewSimpleOrderService,
        };
    }

    async execute(order: Order, company: Company) {
        this.orderModeNotifier[order.mode].send(order, company);
    }
}
