import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../user-association/user/entities/user.entity';
import { ICreditBalanceRepository } from '../interfaces/credit-balance.interface';

@Injectable()
export class UpdateUserCreditBalanceService {
    constructor(@Inject('ICreditBalanceRepository') private creditBalanceRepository: ICreditBalanceRepository) {}

    async execute(userId: User['id'], newValue: number): Promise<void> {
        this.creditBalanceRepository.updateByUserId(userId, newValue);
    }
}
