import { Injectable } from '@nestjs/common';
import { On } from 'nest-event';
import { ICreateUserEvent } from 'src/modules/user-association/user/interface/create-user-event.interface';
import { ICreateCreditHistoryEvent } from '../../credit-history/interfaces/create-credit-history-event.interface';
import { CalculateUserCreditService } from '../../credit-history/services/calculate-user-credit.service';

@Injectable()
export class CreditBalanceListener {
    constructor(private calculateUserCreditService: CalculateUserCreditService) {}

    @On('createUser')
    async onCreateUser({ user }: ICreateUserEvent) {
        const userId = user.id;

        // this.createUserCreditBalanceService.execute(userId, 0);
    }

    @On('createCreditHistory')
    async onCreateCreditHistory({ creditHistory }: ICreateCreditHistoryEvent) {
        const userId = creditHistory.userId;

        const newBalance = 0; //await this.calculateUserCreditService.execute(userId);

        //this.updateUserCreditBalanceService.execute(userId, newBalance);
    }
}
