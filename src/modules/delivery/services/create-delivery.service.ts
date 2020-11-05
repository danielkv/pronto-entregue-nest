import { Inject, Injectable } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from '../../../main-event-emitter/main-events.interface';
import { DeliveryDTO } from '../dtos/delivery.dto';
import { Delivery } from '../entities/delivery.entity';
import { ICreateDeliveryEvent } from '../interfaces/create-delivery-event.interface';
import { IDeliveryRepository } from '../interfaces/delivery.repository.interface';

@Injectable()
export class CreateDeliveryService {
    constructor(
        @Inject('IDeliveryRepository') private deliveryRepository: IDeliveryRepository,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(delivery: DeliveryDTO): Promise<Delivery> {
        // create instance
        const deliveryInstance = this.deliveryRepository.create(delivery);

        // save delivery
        const created = await this.deliveryRepository.save(deliveryInstance);

        // events
        const event: ICreateDeliveryEvent = {
            delivery: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createDelivery', event);

        // return
        return created;
    }
}
