import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../user-association/user/entities/user.entity';
import { ICreditBalanceRepository } from '../interfaces/credit-balance.interface';

@Injectable()
export class GetUserCreditBalanceService {
    constructor(@Inject('ICreditBalanceRepository') private creditBalanceRepository: ICreditBalanceRepository) {}

    execute(userId: User['id']): Promise<number> {
        return this.creditBalanceRepository.getUserBalance(userId);
    }
}
