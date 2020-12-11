import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { On } from 'nest-event';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { CompanyRepository } from 'src/modules/company-association/company/repositories/company.repository';
import { Order } from 'src/modules/order-association/order/entities/order.entity';
import { OrderStatusEnum } from 'src/modules/order-association/order/enums/order.status.enum';
import { OrderTypeEnum } from 'src/modules/order-association/order/enums/order.type.enum';
import { IChangeOrderStatusEvent } from 'src/modules/order-association/order/interfaces/change-order-status-event.interface';
import { ICreateOrderEvent } from 'src/modules/order-association/order/interfaces/create-order-event.interface';
import { Delivery } from '../entities/delivery.entity';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { IChangeDeliveryStatusEvent } from '../interfaces/change-delivery-status-event.interface';
import { ISetDeliveryManEvent } from '../interfaces/set-delivery-man-event.interface';
import { ChangeDeliveryStatusService } from '../services/change-delivery-status.service';
import { CreateDeliveryFromOrderService } from '../services/create-delivery-from-order.service';
import { DeliveryService } from '../services/delivery.service';
import { NotifyDeliveryMenSetService } from '../services/notify-delivery-man-set.service';
import { NotifyDeliveryMenService } from '../services/notify-delivery-men.service';
import { NotifyDeliveryChangeStatusService } from '../services/notify-delivery-status-change.service';

@Injectable()
export class DeliveryListener {
    constructor(
        @InjectQueryService(Delivery) private deliveryService: DeliveryService,
        @InjectQueryService(Order) private orderService: QueryService<Order>,
        @InjectQueryService(CompanyRepository) private companyService: QueryService<Company>,
        private notifyDeliveryMenSetService: NotifyDeliveryMenSetService,
        private notifyDeliveryMenService: NotifyDeliveryMenService,
        private notifyDeliveryChangeStatusService: NotifyDeliveryChangeStatusService,
        private createDeliveryFromOrderService: CreateDeliveryFromOrderService,
        private changeDeliveryStatusService: ChangeDeliveryStatusService,
    ) {}

    @On('createOrder')
    createOrderListener({ order }: ICreateOrderEvent) {
        // check order type
        if (order.type !== OrderTypeEnum.PE_DELIVERY) return;

        // execute action
        this.createDeliveryFromOrderService.execute(order);
    }

    @On('setDeliveryMan')
    async onSetOrderDeliveryMan({ delivery, user }: ISetDeliveryManEvent) {
        // if is delivery from order
        if (!delivery.orderId) return false;

        // checks if order exists
        const order = await this.orderService.findById(delivery.orderId);
        if (!order) throw new Error('Pedido não encontrado');

        // check if company exits
        const company = await this.companyService.findById(order.companyId);
        if (!company) throw new Error('Empresa não encontrada');

        // get companyId

        // send notification to subscribed clients
        /* pubSub.publish(ORDER_UPDATED, {
				orderUpdated: instanceToData(order),
				companyId,
			}); */

        // get desktop tokens
        this.notifyDeliveryMenSetService.execute(delivery, user, company);

        return true;
    }

    @On('changeOrderStatus')
    async changeOrderStatusListener({ order, status, authContext }: IChangeOrderStatusEvent) {
        // check type
        if (order.type !== OrderTypeEnum.PE_DELIVERY) return;

        // check status
        if ([OrderStatusEnum.WAITING_PICK_UP, OrderStatusEnum.DELIVERED, OrderStatusEnum.CANCELED].includes(status))
            return;

        // get or create delivery
        let [delivery] = await this.deliveryService.query({
            filter: { orderId: { eq: order.id } },
            paging: { limit: 1 },
        });
        if (!delivery) delivery = await this.createDeliveryFromOrderService.execute(order);

        const newDeliveryStatus: DeliveryStatusEnum = Object.values(DeliveryStatusEnum).find(
            stat => String(stat) === String(status),
        );

        // also change delivery status if newStatus matches
        if ([DeliveryStatusEnum.WAITING_DELIVERY, DeliveryStatusEnum.DELIVERING].includes(newDeliveryStatus))
            this.changeDeliveryStatusService.execute(delivery.id, newDeliveryStatus, authContext, {
                disableEvents: true,
            });
    }

    @On('changeDeliveryStatus')
    async changeDeliveryStatusListener({ delivery, status }: IChangeDeliveryStatusEvent) {
        // send delivery data to subscribers
        //pubSub.publish(DELIVERY_UPDATED, { delivery: instanceToData(delivery) })

        // checks if any order is assign to
        if (!delivery.orderId) return;

        // check if order exits
        const order = await this.orderService.findById(delivery.orderId);
        if (!order) return;

        // check if company exits
        const company = await this.companyService.findById(order.companyId);
        if (!company) return;

        // send delivery data to subscribers
        //pubSub.publish(ORDER_UPDATED, { orderUpdated: instanceToData(order), companyId: order.get('companyId') });

        if (status === DeliveryStatusEnum.CANCELED) {
            // unassign delivery from order
            await this.deliveryService.updateOne(delivery.id, { orderId: null });

            // return order to status waiting delivery
            if (order.status !== OrderStatusEnum.DELIVERED)
                await this.orderService.updateOne(order.id, { status: OrderStatusEnum.WAITING_DELIVERY });
        }

        // notify company users if delivery is assign to order
        if ([DeliveryStatusEnum.DELIVERED, DeliveryStatusEnum.CANCELED].includes(status))
            this.notifyDeliveryChangeStatusService.execute(delivery, order, company);

        // case new status is waitingDelivery, notify delivery men
        if (status === DeliveryStatusEnum.WAITING_DELIVERY)
            this.notifyDeliveryMenService.execute(delivery, order, company);
    }
}
