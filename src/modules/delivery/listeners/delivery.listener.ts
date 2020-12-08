import { Injectable } from '@nestjs/common';
import { On } from 'nest-event';
import { OrderTypeEnum } from 'src/modules/order-association/order/enums/order.type.enum';
import { ICreateOrderEvent } from 'src/modules/order-association/order/interfaces/create-order-event.interface';
import { CreateDeliveryFromOrderService } from '../services/create-delivery-from-order.service';

@Injectable()
export class DeliveryListener {
    constructor(private createDeliveryFromOrderService: CreateDeliveryFromOrderService) {}

    @On('createOrder')
    createOrderListener({ order }: ICreateOrderEvent) {
        // check order type
        if (order.type !== OrderTypeEnum.PE_DELIVERY) return;

        // execute action
        this.createDeliveryFromOrderService.execute(order);
    }

    /*  @On('changeOrderStatus')
    changeOrderStatusListener({ order }: ICreateOrderEvent) {
        // check order type
        if (order.type !== OrderTypeEnum.PE_DELIVERY) return;

        // execute action
        this.createDeliveryFromOrderService.execute(order);
    } */
}
