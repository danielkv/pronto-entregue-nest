import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { Order } from '../entities/order.entity';
import { OrderStatusEnum } from '../enums/order.status.enum';
import { IChangeOrderStatusEvent } from '../interfaces/change-order-status-event.interface';
import { IOrderRepository } from '../interfaces/order.repository.interface';
import { AcCheckService } from '../../../auth/services/validate-roles.service';
import { UserTokenPayload } from '../../../auth/interfaces/user-token-payload.interface';
import { ACLResourcesEnum } from 'src/modules/auth/enums/resources.enum';

@Injectable()
export class ChangeOrderStatusService {
    constructor(
        @Inject('IOrderRepository') private orderRepository: IOrderRepository,
        private acCheckService: AcCheckService,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(orderId: Order['id'], newStatus: OrderStatusEnum, userCtx: UserTokenPayload): Promise<Order> {
        // check if order exists
        const order = await this.orderRepository.get(orderId);
        if (!order) throw new NotFoundException('Pedido não existe');

        // check user permissions
        this.checkUserPermissions(order.status, newStatus, userCtx);

        // update status
        await this.orderRepository.changeStatus(orderId, newStatus);

        // merge
        const mergedOrder = this.orderRepository.merge(order, { status: newStatus });

        // events
        const event: IChangeOrderStatusEvent = {
            order: mergedOrder,
            status: newStatus,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateOrder', event);

        // return
        return mergedOrder;
    }

    checkUserPermissions(oldStatus: OrderStatusEnum, newStatus: OrderStatusEnum, userCtx: UserTokenPayload) {
        // check user permissions
        if (
            this.acCheckService.execute(
                { action: 'update', resource: ACLResourcesEnum.ORDER_STATUS, possession: 'own' },
                { user: userCtx },
            )
        )
            return true;

        // get statuses order
        const validStatus = Object.values(OrderStatusEnum);

        // get status index
        const newStatusIndex = validStatus.findIndex(stat => stat === newStatus);
        const oldStatusIndex = validStatus.findIndex(stat => stat === oldStatus);

        // check
        if (newStatusIndex < oldStatusIndex)
            throw new ForbiddenException('Você não tem permissão voltar ao status anterior');

        return true;
    }
}
