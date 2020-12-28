import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user-association/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreditBalance } from '../entities/credit.balance.entity';

@QueryService(CreditBalance)
export class CreditBalanceService extends TypeOrmQueryService<CreditBalance> {
    constructor(@InjectRepository(CreditBalance) private repository: Repository<CreditBalance>) {
        super(repository);
    }

    updateByUserId(userId: User['id'], balance: number) {
        return this.repository.update({ userId }, { value: balance });
    }

    async getByUserId(userId: User['id']): Promise<number> {
        const creditBalance = await this.repository.findOne({ userId });

        return creditBalance.value;
    }
}
