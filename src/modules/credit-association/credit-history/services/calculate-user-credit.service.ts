import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { User } from '../../../user-association/user/entities/user.entity';
import { CreditHistoryDTO } from '../dtos/credit.history.dto';
import { CreditHistoryRepository } from '../repositories/credit-history.repository';

@Injectable()
export class CalculateUserCreditService {
    constructor(
        @InjectQueryService(CreditHistoryRepository) private creditHistoriesService: QueryService<CreditHistoryDTO>,
    ) {}

    async execute(userId: User['id']): Promise<number> {
        const creditHistoriesSum = await this.creditHistoriesService.aggregate(
            { userId: { eq: userId } },
            { sum: ['value'] },
        );

        return creditHistoriesSum.sum.value;
    }
}
