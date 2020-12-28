import {
    DeepPartial,
    InjectAssemblerQueryService,
    InjectQueryService,
    QueryService,
    UpdateOneOptions,
} from '@nestjs-query/core';
import { NestEventEmitter } from 'nest-event';

import { Order } from '../entities/order.entity';
import { EventEmitterService } from '../../../common/services/event-emitter.service';
import { OrderAssembler } from '../assemblers/order.assembler';
import { OrderInputDTO } from '../dtos/order-input.dto';
import { ValidateUseCouponHelper } from 'src/modules/coupon/helpers/validate-use-coupon.helper';
import { ValidateUserBalanceService } from 'src/modules/credit-association/credit-balance/services/validate-user-balance.service';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { CompanyRepository } from 'src/modules/company-association/company/repositories/company.repository';
import { CreditHistoryInputDTO } from 'src/modules/credit-association/credit-history/dtos/credit-history-input.dto';

@QueryService(Order)
export class OrderService extends EventEmitterService<Order, DeepPartial<OrderInputDTO>, DeepPartial<OrderInputDTO>> {
    constructor(
        @InjectAssemblerQueryService(OrderAssembler) readonly service: QueryService<Order>,

        @InjectQueryService(CompanyRepository) readonly companyService: QueryService<Company>,

        private validateUseCouponHelper: ValidateUseCouponHelper,
        private validateUserBalanceService: ValidateUserBalanceService,
        protected eventEmitter: NestEventEmitter,
    ) {
        // provide the logger name and the service
        super(service, eventEmitter, { createEvent: 'createOrder', updateEvent: 'updateOrder' });
    }

    async createOne(order: DeepPartial<OrderInputDTO>): Promise<Order> {
        const orderToCreate = await this.validateOrder(order);

        const created = await super.createOne(orderToCreate);

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

    private async validateOrder(order: DeepPartial<OrderInputDTO>): Promise<DeepPartial<OrderInputDTO>> {
        if (order.useCredit === true) {
            await this.validateUserBalanceService.validate(order);

            order.creditHistory = await this.createCreditHistoryFromOrder(order);
        }

        if (order.couponId) await this.validateUseCouponHelper.validate(order);

        return order;
    }

    private async createCreditHistoryFromOrder(order: DeepPartial<OrderInputDTO>): Promise<CreditHistoryInputDTO> {
        const company = await this.companyService.findById(order.companyId);

        return {
            userId: order.userId,
            value: -order.price,
            history: `Pedido em ${company.displayName}`,
        };
    }
}
