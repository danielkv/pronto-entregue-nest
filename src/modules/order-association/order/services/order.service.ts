import { DeepPartial, InjectAssemblerQueryService, QueryService, UpdateOneOptions } from '@nestjs-query/core';
import { NestEventEmitter } from 'nest-event';

import { Order } from '../entities/order.entity';
import { EventEmitterService } from '../../../common/services/event-emitter.service';
import { OrderAssembler } from '../assemblers/order.assembler';
import { OrderInputDTO } from '../dtos/order-input.dto';
import { ValidateUseCouponHelper } from 'src/modules/coupon/helpers/validate-use-coupon.helper';
import { ValidateUserBalanceService } from 'src/modules/credit-association/credit-balance/services/validate-user-balance.service';
import { Company } from 'src/modules/company-association/company/entities/company.entity';
import { CreditHistoryInputDTO } from 'src/modules/credit-association/credit-history/dtos/credit-history-input.dto';
import { CompanyService } from 'src/modules/company-association/company/services/company.service';
import { ForbiddenException } from '@nestjs/common';
import { OrderModeEnum } from '../enums/order-mode-enum';

@QueryService(Order)
export class OrderService extends EventEmitterService<Order, DeepPartial<OrderInputDTO>, DeepPartial<OrderInputDTO>> {
    constructor(
        @InjectAssemblerQueryService(OrderAssembler) readonly service: QueryService<Order>,

        private companyService: CompanyService,

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
        // get company
        const company = await this.companyService.getCompanyWithMetas(order.companyId);

        // check business hours
        this.validateOrderMode(order, company);

        // check credits
        if (order.useCredit === true) {
            await this.validateUserBalanceService.validate(order);

            order.creditHistory = this.createCreditHistoryFromOrder(order, company);
        }

        // check coupon
        if (order.couponId) await this.validateUseCouponHelper.validate(order);

        return order;
    }

    private validateOrderMode(order: DeepPartial<OrderInputDTO>, company: Company): DeepPartial<OrderInputDTO> {
        const { isOpen, allowBuyClosed } = company;

        order.mode = OrderModeEnum.SIMPLE;

        if (order.scheduledTo) order.mode = OrderModeEnum.SCHEDULED;

        if (!isOpen) {
            if (!allowBuyClosed) throw new ForbiddenException(`${company.displayName} está fechado no momento`);
            else {
                if (!order.scheduledTo && allowBuyClosed === 'onlyScheduled')
                    throw new Error(`${company.displayName} está fechado no momento, tente mais tarde`);
                order.mode = OrderModeEnum.RESERVED;
            }
        }

        return order;
    }

    private createCreditHistoryFromOrder(order: DeepPartial<OrderInputDTO>, company: Company): CreditHistoryInputDTO {
        return {
            userId: order.userId,
            value: -order.price,
            history: `Pedido em ${company.displayName}`,
        };
    }
}
