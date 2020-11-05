import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { Delivery } from '../entities/delivery.entity';
import { IDeliveryRepository } from '../interfaces/delivery.repository.interface';
import { ISetDeliveryManEvent } from '../interfaces/set-delivery-man-event.interface';

@Injectable()
export class SetDeliveryManService {
    constructor(
        @Inject('IDeliveryRepository') private deliveryRepository: IDeliveryRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(deliveryId: Delivery['id'], userId: User['id']): Promise<Delivery> {
        // check if delivery exists
        const delivery = await this.deliveryRepository.get(deliveryId);
        if (!delivery) throw new NotFoundException('Entrega não existe');

        // merge new data
        const mergedDelivery = this.deliveryRepository.merge(delivery, { deliveryManId: userId });

        // set delivery man
        await this.deliveryRepository.setDeliveryMan(deliveryId, userId);

        // events
        const event: ISetDeliveryManEvent = {
            delivery: mergedDelivery,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('setDeliveryMan', event);

        // return
        return mergedDelivery;
    }
}
