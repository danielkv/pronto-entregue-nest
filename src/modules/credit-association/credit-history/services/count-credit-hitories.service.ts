import { Inject, Injectable } from '@nestjs/common';
import { CreditHistoryFilterDTO } from '../dtos/credit-history.filters.dto';
import { CreditHistory } from '../entities/credit.history.entity';
import { CreditHistoryUserFilter } from '../filters/credit-history.user.filter';
import { ICreditHistoryFiltersOptions } from '../interfaces/credit-history-filters-options.interface';
import { ICreditHistoryRepository } from '../interfaces/credit-history.interface';

@Injectable()
export class CountCreditHistoriesService {
    constructor(
        @Inject('ICreditHistoryRepository') private creditHistoryRepository: ICreditHistoryRepository,
        private creditHistoryUserFilter: CreditHistoryUserFilter,
    ) {}

    execute(filter: CreditHistoryFilterDTO): Promise<number> {
        const options: ICreditHistoryFiltersOptions = {
            filter,
            filterHelpers: [this.creditHistoryUserFilter],
        };

        return this.creditHistoryRepository.getCount(options);
    }
}
