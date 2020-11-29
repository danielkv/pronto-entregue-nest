import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { Delivery } from '../entities/delivery.entity';

import { ISetDeliveryManEvent } from '../interfaces/set-delivery-man-event.interface';
import { DeliveryRepository } from '../repositories/delivery.repository';

@Injectable()
export class SetDeliveryManService {
    constructor(
        @InjectQueryService(DeliveryRepository) private deliveryService: QueryService<Delivery>,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(deliveryId: Delivery['id'], userId: User['id']): Promise<Delivery> {
        // check if delivery exists
        const delivery = await this.deliveryService.findById(deliveryId);
        if (!delivery) throw new NotFoundException('Entrega não existe');

        // set delivery man
        const updated = await this.deliveryService.updateOne(deliveryId, { deliveryManId: userId });

        // events
        const event: ISetDeliveryManEvent = {
            delivery: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('setDeliveryMan', event);

        // return
        return updated;
    }
}
