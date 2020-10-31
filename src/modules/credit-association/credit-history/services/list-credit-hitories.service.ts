import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from '../../../common/types/page-info';
import { CreditHistoryFilterDTO } from '../dtos/credit-history.filters.dto';
import { CreditHistory } from '../entities/credit.history.entity';
import { CreditHistoryUserFilter } from '../filters/credit-history.user.filter';
import { ICreditHistoryListOptions } from '../interfaces/credit-history-list-options.interface';
import { ICreditHistoryRepository } from '../interfaces/credit-history.interface';

@Injectable()
export class ListCreditHistoriesService {
    constructor(
        @Inject('ICreditHistoryRepository') private creditHistoryRepository: ICreditHistoryRepository,
        private creditHistoryUserFilter: CreditHistoryUserFilter,
    ) {}

    execute(filter: CreditHistoryFilterDTO, pagination?: PageInfo): Promise<CreditHistory[]> {
        const options: ICreditHistoryListOptions = {
            pagination,
            filter,
            filterHelpers: [this.creditHistoryUserFilter],
        };

        return this.creditHistoryRepository.getList(options);
    }
}
