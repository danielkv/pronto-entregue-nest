import { InjectAssemblerQueryService, QueryService } from '@nestjs-query/core';
import { NestEventEmitter } from 'nest-event';
import { EventEmitterService } from 'src/modules/common/services/event-emitter.service';
import { DeliveryAssembler } from '../assemblers/delivery.assembler';
import { Delivery } from '../entities/delivery.entity';

@QueryService(Delivery)
export class DeliveryService extends EventEmitterService<Delivery> {
    constructor(
        @InjectAssemblerQueryService(DeliveryAssembler) service: QueryService<Delivery>,
        protected eventEmitter: NestEventEmitter,
    ) {
        // provide the logger name and the service
        super(service, eventEmitter, { createEvent: 'createDelivery', updateEvent: 'updateDelivery' });
    }
}
