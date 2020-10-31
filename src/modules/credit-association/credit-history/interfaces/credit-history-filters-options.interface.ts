import { IRepositoryFiltersOptions } from '../../../common/interfaces/IRepositoryFiltersOptions';
import { CreditHistoryFilterDTO } from '../dtos/credit-history.filters.dto';
import { CreditHistory } from '../entities/credit.history.entity';

export interface ICreditHistoryFiltersOptions
    extends IRepositoryFiltersOptions<CreditHistory, CreditHistoryFilterDTO> {}
