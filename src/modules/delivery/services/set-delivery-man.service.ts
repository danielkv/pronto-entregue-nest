import { InjectAssemblerQueryService, QueryService } from '@nestjs-query/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { DeepPartial } from 'typeorm';
import { DeliveryAssembler } from '../assemblers/delivery.assembler';
import { DeliveryDTO } from '../dtos/delivery.dto';
import { Delivery } from '../entities/delivery.entity';

@Injectable()
export class SetDeliveryManService {
    constructor(
        @InjectAssemblerQueryService(DeliveryAssembler)
        private deliveryService: QueryService<DeliveryDTO, DeepPartial<DeliveryDTO>, DeepPartial<Delivery>>,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(deliveryId: Delivery['id'], userId: User['id']): Promise<DeliveryDTO> {
        // check if delivery exists
        const delivery = await this.deliveryService.findById(deliveryId);
        if (!delivery) throw new NotFoundException('Entrega não existe');

        // set delivery man
        const updated = await this.deliveryService.updateOne(deliveryId, { deliveryManId: userId });

        // events
        const event = {
            delivery: updated,
        };
        this.eventEmitter.emit('setDeliveryMan', event);

        // return
        return updated;
    }
}
