import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Injectable } from '@nestjs/common';
import { User } from '../../../user-association/user/entities/user.entity';
import { CreditHistory } from '../../credit-history/entities/credit.history.entity';

@Injectable()
export class CalculateUserBalanceService {
    constructor(@InjectQueryService(CreditHistory) private creditHistoriesService: QueryService<CreditHistory>) {}

    async execute(userId: User['id']): Promise<number> {
        const creditHistoriesSum = await this.creditHistoriesService.aggregate(
            { userId: { eq: userId } },
            { sum: ['value'] },
        );

        return creditHistoriesSum.sum.value;
    }
}
