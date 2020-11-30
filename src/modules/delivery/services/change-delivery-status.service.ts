import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';
import { Delivery } from '../entities/delivery.entity';
import { IChangeDeliveryStatusEvent } from '../interfaces/change-delivery-status-event.interface';

@Injectable()
export class ChangeDeliveryStatusService {
    /*  constructor(
        @Inject('IDeliveryRepository') private deliveryRepository: IDeliveryRepository,
        private acCheckService: AcCheckService,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(
        deliveryId: Delivery['id'],
        newStatus: DeliveryStatusEnum,
        userCtx: UserTokenPayload,
    ): Promise<Delivery> {
        // check if order exists
        const delivery = await this.deliveryRepository.get(deliveryId);
        if (!delivery) throw new NotFoundException('Entrega não existe');

        // check user permissions
        this.checkUserPermissions(delivery.status, newStatus, userCtx);

        // update status
        await this.deliveryRepository.changeStatus(deliveryId, newStatus);

        // merge
        const mergedDelivery = this.deliveryRepository.merge(delivery, { status: newStatus });

        // events
        const event: IChangeDeliveryStatusEvent = {
            delivery: mergedDelivery,
            status: newStatus,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('changeDeliveryStatus', event);

        // return
        return mergedDelivery;
    }

    checkUserPermissions(oldStatus: DeliveryStatusEnum, newStatus: DeliveryStatusEnum, userCtx: UserTokenPayload) {
        // check user permissions
        if (
            this.acCheckService.execute(
                { action: 'update', resource: ACLResourcesEnum.ORDER_STATUS, possession: 'own' },
                { user: userCtx },
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
    } */
}
