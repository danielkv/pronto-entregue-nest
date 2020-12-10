import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { Delivery } from '../entities/delivery.entity';
import { ACLResourcesEnum } from 'src/modules/auth/enums/resources.enum';
import { IAuthContext } from 'src/modules/auth/interfaces/guard-roles.interface';
import { AcCheckService } from 'src/modules/auth/services/validate-roles.service';
import { DeepPartial, InjectAssemblerQueryService, InjectQueryService, QueryService } from '@nestjs-query/core';
import { DeliveryAssembler } from '../assemblers/delivery.assembler';
import { DeliveryDTO } from '../dtos/delivery.dto';
import { Order } from 'src/modules/order-association/order/entities/order.entity';

import { OrderService } from 'src/modules/order-association/order/services/order.service';
import { IServiceOptions } from 'src/modules/common/interfaces/service-options.interface';

@Injectable()
export class ChangeDeliveryStatusService {
    constructor(
        @InjectQueryService(Order) private orderService: OrderService,

        @InjectAssemblerQueryService(DeliveryAssembler)
        private deliveryService: QueryService<DeliveryDTO, DeepPartial<DeliveryDTO>, DeepPartial<Delivery>>,
        private acCheckService: AcCheckService,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(
        deliveryId: Delivery['id'],
        newStatus: DeliveryStatusEnum,
        authContext: IAuthContext,
        options?: IServiceOptions,
    ): Promise<DeliveryDTO> {
        // check if order exists
        const delivery = await this.deliveryService.findById(deliveryId);
        if (!delivery) throw new NotFoundException('Entrega não existe');

        // check user permissions
        if (!(await this.checkUserPermissions(delivery, newStatus, authContext))) return;

        // update status
        const updatedDelivery = await this.deliveryService.updateOne(deliveryId, { status: newStatus });

        // events
        const event = {
            delivery: updatedDelivery,
            status: newStatus,
            authContext,
        };
        if (!options.disableEvents) this.eventEmitter.emit('changeDeliveryStatus', event);

        // return
        return updatedDelivery;
    }

    private async checkUserPermissions(
        delivery: DeliveryDTO,
        newStatus: DeliveryStatusEnum,
        authContext: IAuthContext,
    ) {
        // test company
        if (authContext.company) {
            const companyId = authContext.company.companyId;

            const order = await this.orderService.findById(delivery.orderId);
            if (!order) throw new NotFoundException('Pedido não encontrado');

            if (companyId !== order.companyId)
                throw new UnauthorizedException('Usuário não autenticado para esse estabelecimento');
        }

        const oldStatus = delivery.status;

        // check user permissions
        if (
            this.acCheckService.execute(
                { action: 'update', resource: ACLResourcesEnum.ORDER_STATUS, possession: 'own' },
                authContext,
            )
        )
            return true;

        // get statuses order
        const validStatus = Object.values(DeliveryStatusEnum);

        // get status index
        const newStatusIndex = validStatus.findIndex(stat => stat === newStatus);
        const oldStatusIndex = validStatus.findIndex(stat => stat === oldStatus);

        // check
        if (newStatusIndex < oldStatusIndex)
            throw new ForbiddenException('Você não tem permissão voltar ao status anterior');

        return true;
    }
}
