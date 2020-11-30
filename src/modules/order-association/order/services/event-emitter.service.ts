import { QueryService, UpdateOneOptions } from '@nestjs-query/core';
import { ProxyQueryService } from '@nestjs-query/core/dist/src/services/proxy-query.service';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { DeepPartial } from 'typeorm';
import { ICreateOrderEvent } from '../interfaces/create-order-event.interface';
import { IUpdateOrderEvent } from '../interfaces/update-order-event.interface';
import { OrderRepository } from '../repositories/order.repository';

export class OrderEventEmitterService<DTO, C = DeepPartial<DTO>, U = DeepPartial<DTO>> extends ProxyQueryService<
    DTO,
    C,
    U
> {
    constructor(
        queryService: QueryService<DTO, C, U>,
        protected eventEmitter: NestEventEmitter,
        protected orderRepository: OrderRepository,
    ) {
        // call super witht the QueryService we will delegate to
        super(queryService);
    }

    async createOne(item: C): Promise<DTO> {
        // create order
        const createdOrderDTO = await super.createOne(item);

        const orderEntity = this.orderRepository.create(createdOrderDTO);

        // events
        const event: ICreateOrderEvent = {
            order: orderEntity,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createOrder', event);

        return createdOrderDTO;
    }

    async updateOne(id: string | number, update: U, opts?: UpdateOneOptions<DTO>): Promise<DTO> {
        // update order
        const updatedOrderDTO = await super.updateOne(id, update, opts);

        const orderEntity = this.orderRepository.create(updatedOrderDTO);

        // events
        const event: IUpdateOrderEvent = {
            order: orderEntity,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('updateOrder', event);

        return updatedOrderDTO;
    }
}
