import { DeepPartial, InjectAssemblerQueryService, QueryService, UpdateOneOptions } from '@nestjs-query/core';
import { NestEventEmitter } from 'nest-event';

import { Order } from '../entities/order.entity';
import { EventEmitterService } from '../../../common/services/event-emitter.service';
import { OrderAssembler } from '../assemblers/order.assembler';
import { OrderInputDTO } from '../dtos/order-input.dto';
import { ValidateUseCouponHelper } from 'src/modules/coupon/helpers/validate-use-coupon.helper';

@QueryService(Order)
export class OrderService extends EventEmitterService<Order, DeepPartial<OrderInputDTO>, DeepPartial<OrderInputDTO>> {
    constructor(
        @InjectAssemblerQueryService(OrderAssembler) readonly service: QueryService<Order>,
        private validateUseCouponHelper: ValidateUseCouponHelper,
        protected eventEmitter: NestEventEmitter,
    ) {
        // provide the logger name and the service
        super(service, eventEmitter, { createEvent: 'createOrder', updateEvent: 'updateOrder' });
    }

    async createOne(order: DeepPartial<OrderInputDTO>): Promise<Order> {
        if (order.couponId) await this.validateUseCouponHelper.validate(order);

        const created = await super.createOne(order);

        return created;
    }

    async updateOne(
        id: string | number,
        order: DeepPartial<OrderInputDTO>,
        opts?: UpdateOneOptions<Order>,
    ): Promise<Order> {
        if (order.couponId) await this.validateUseCouponHelper.validate(order);

        const updated = await super.updateOne(id, order, opts);

        return updated;
    }
}
