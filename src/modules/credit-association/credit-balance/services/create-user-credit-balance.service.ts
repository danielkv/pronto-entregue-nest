import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../user-association/user/entities/user.entity';
import { CreditBalance } from '../entities/credit.balance.entity';
import { ICreditBalanceRepository } from '../interfaces/credit-balance.interface';

@Injectable()
export class CreateUserCreditBalanceService {
    constructor(@Inject('ICreditBalanceRepository') private creditBalanceRepository: ICreditBalanceRepository) {}

    async execute(userId: User['id'], initialValue: number): Promise<CreditBalance> {
        return this.creditBalanceRepository.create({ userId, value: initialValue });
    }
}
