import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { NestEventEmitter } from 'nest-event';
import { EventEmitterService } from 'src/modules/common/services/event-emitter.service';
import { CreditHistory } from '../entities/credit.history.entity';

@QueryService(CreditHistory)
export class CreditHistoryService extends EventEmitterService<CreditHistory> {
    constructor(
        @InjectQueryService(CreditHistory) readonly service: QueryService<CreditHistory>,

        protected eventEmitter: NestEventEmitter,
    ) {
        // provide the logger name and the service
        super(service, eventEmitter, { createEvent: 'createCreditHistory' });
    }
}
