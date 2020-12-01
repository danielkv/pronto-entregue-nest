import { QueryService, UpdateOneOptions } from '@nestjs-query/core';
import { ProxyQueryService } from '@nestjs-query/core/dist/src/services/proxy-query.service';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { DeepPartial } from 'typeorm';

interface IEventKeys {
    createEvent?: keyof IMainEvents;
    updateEvent?: keyof IMainEvents;
}

export class EventEmitterService<DTO, C = DeepPartial<DTO>, U = DeepPartial<DTO>> extends ProxyQueryService<DTO, C, U> {
    constructor(
        queryService: QueryService<DTO, C, U>,
        protected eventEmitter: NestEventEmitter,
        readonly eventKeys: IEventKeys,
    ) {
        // call super witht the QueryService we will delegate to
        super(queryService);
    }

    async createOne(item: C): Promise<DTO> {
        // create order
        const created = await super.createOne(item);
        if (!this.eventKeys.createEvent) return created;

        // events
        const event = {
            order: created,
        };
        this.eventEmitter.emit(this.eventKeys.createEvent, event);

        return created;
    }

    async updateOne(id: string | number, update: U, opts?: UpdateOneOptions<DTO>): Promise<DTO> {
        // update order
        const updated = await super.updateOne(id, update, opts);
        if (!this.eventKeys.updateEvent) return updated;

        // events
        const event = {
            order: updated,
        };
        this.eventEmitter.emit(this.eventKeys.updateEvent, event);

        return updated;
    }
}
