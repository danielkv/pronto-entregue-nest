import { Injectable } from '@nestjs/common';
import { On } from 'nest-event';
import { ICreateUserEvent } from 'src/modules/user-association/user/interface/create-user-event.interface';
import { ICreateCreditHistoryEvent } from '../../credit-history/interfaces/create-credit-history-event.interface';
import { CalculateUserBalanceService } from '../services/calculate-user-balance.service';
import { CreditBalanceService } from '../services/creditBalanceService';

@Injectable()
export class CreditBalanceListener {
    constructor(
        private calculateUserBalanceService: CalculateUserBalanceService,
        private creditBalanceService: CreditBalanceService,
    ) {}

    @On('createUser')
    async onCreateUser({ user }: ICreateUserEvent) {
        const userId = user.id;

        this.creditBalanceService.createOne({ userId, value: 0 });
    }

    @On('createCreditHistory')
    async onCreateCreditHistory({ creditHistory }: ICreateCreditHistoryEvent) {
        const userId = creditHistory.userId;

        const newBalance = await this.calculateUserBalanceService.execute(userId);

        return this.creditBalanceService.updateByUserId(userId, newBalance);
    }
}
