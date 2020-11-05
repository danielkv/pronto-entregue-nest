import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from '../../../main-event-emitter/main-events.interface';
import { DeliveryDTO } from '../dtos/delivery.dto';
import { Delivery } from '../entities/delivery.entity';
import { IDeliveryRepository } from '../interfaces/delivery.repository.interface';
import { IUpdateDeliveryEvent } from '../interfaces/update-delivery-event.interface';

@Injectable()
export class UpdateDeliveryService {
    constructor(
        @Inject('IDeliveryRepository') private deliveryRepository: IDeliveryRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(deliveryId: Delivery['id'], delivery: DeliveryDTO): Promise<Delivery> {
        // check if delivery exists
        const oldDelivery = await this.deliveryRepository.get(deliveryId);
        if (!oldDelivery) throw new NotFoundException('Entrega não existe');

        // forbidden
        delete delivery.deliveryManId;
        delete delivery.orderId;

        // merge new data
        const mergedDelivery = this.deliveryRepository.merge(oldDelivery, delivery);

        // save delivery
        const updated = await this.deliveryRepository.save(mergedDelivery);

        // events
        const event: IUpdateDeliveryEvent = {
            delivery: updated,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateDelivery', event);

        // return
        return updated;
    }
}
