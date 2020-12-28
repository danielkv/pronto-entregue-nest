import { DeepPartial } from '@nestjs-query/core';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { OrderInputDTO } from 'src/modules/order-association/order/dtos/order-input.dto';
import { CreditBalanceService } from './creditBalanceService';

@Injectable()
export class ValidateUserBalanceService {
    constructor(private creditBalanceService: CreditBalanceService) {}

    async validate(order: DeepPartial<OrderInputDTO>): Promise<boolean> {
        const userCreditBalance = await this.creditBalanceService.getByUserId(order.userId);

        if (userCreditBalance < order.price)
            throw new ForbiddenException('Usuário não possui créditos suficientes para essa compra');

        return true;
    }
}
