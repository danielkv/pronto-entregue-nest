import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { ACLResourcesEnum } from 'src/modules/auth/enums/resources.enum';
import { IAuthContext } from 'src/modules/auth/interfaces/guard-roles.interface';
import { AcCheckService } from 'src/modules/auth/services/validate-roles.service';
import { DeepPartial, InjectAssemblerQueryService, QueryService } from '@nestjs-query/core';
import { Order } from 'src/modules/order-association/order/entities/order.entity';
import { OrderAssembler } from '../assemblers/order.assembler';
import { OrderDTO } from '../dtos/order.dto';
import { OrderStatusEnum } from '../enums/order.status.enum';
import { IServiceOptions } from 'src/modules/common/interfaces/service-options.interface';

@Injectable()
export class ChangeOrderStatusService {
    constructor(
        @InjectAssemblerQueryService(OrderAssembler)
        private orderService: QueryService<OrderDTO, DeepPartial<OrderDTO>, DeepPartial<Order>>,
        private acCheckService: AcCheckService,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(
        orderId: Order['id'],
        newStatus: OrderStatusEnum,
        authContext: IAuthContext,
        options?: IServiceOptions,
    ): Promise<OrderDTO> {
        // check if order exists
        const order = await this.orderService.findById(orderId);
        if (!order) throw new NotFoundException('Entrega não existe');

        // check user permissions
        if (!(await this.checkUserPermissions(order, newStatus, authContext))) return;

        // update status
        const updatedOrder = await this.orderService.updateOne(orderId, { status: newStatus });

        // events
        const event = {
            order: updatedOrder,
            status: newStatus,
            authContext,
        };
        if (!options.disableEvents) this.eventEmitter.emit('changeOrderStatus', event);

        // return
        return updatedOrder;
    }

    private async checkUserPermissions(order: OrderDTO, newStatus: OrderStatusEnum, authContext: IAuthContext) {
        // test company
        if (authContext.company) {
            const companyId = authContext.company.companyId;

            if (companyId !== order.companyId)
                throw new UnauthorizedException('Usuário não autenticado para esse estabelecimento');
        }

        const oldStatus = order.status;

        // check user permissions
        if (
            this.acCheckService.execute(
                { action: 'update', resource: ACLResourcesEnum.ORDER_STATUS, possession: 'own' },
                authContext,
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
