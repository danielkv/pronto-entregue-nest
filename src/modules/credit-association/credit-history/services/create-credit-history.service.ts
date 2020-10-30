import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NestEventEmitter } from 'nest-event';
import { IMainEvents } from 'src/main-event-emitter/main-events.interface';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { GetUserService } from 'src/modules/user-association/user/services/get.user.service';
import { GetUserCreditBalanceService } from '../../credit-balance/services/get.user-credit-balance.service';
import { CreditHistory } from '../entities/credit.history.entity';
import { ICreateCreditHistoryEvent } from '../interfaces/create-credit-history-event.interface';
import { ICreditHistoryRepository } from '../interfaces/credit-history.interface';

@Injectable()
export class CreateCreditHistoryService {
    constructor(
        @Inject('ICreditHistoryRepository') private creditHistoryRepository: ICreditHistoryRepository,
        private getUserCreditBalanceService: GetUserCreditBalanceService,
        private getUserService: GetUserService,
        private eventEmitter: NestEventEmitter,
    ) {}

    async execute(userId: User['id'], value: number): Promise<CreditHistory> {
        // check if company exists
        const user = await this.getUserService.execute(userId);
        if (!user) throw new NotFoundException('Usuário não existe');

        // check balance
        const userBalance = await this.getUserCreditBalanceService.execute(userId);
        if (userBalance + value < 0) throw new ForbiddenException('Saldo insuficiente');

        // create instance
        const creditHistoryInstance = this.creditHistoryRepository.create({ userId, value });

        // save instance
        const created = await this.creditHistoryRepository.save(creditHistoryInstance);

        // events
        const event: ICreateCreditHistoryEvent = {
            creditHistory: created,
        };
        this.eventEmitter.strictEmitter<IMainEvents>().emit('createCreditHistory', event);

        // return address
        return created;
    }
}
