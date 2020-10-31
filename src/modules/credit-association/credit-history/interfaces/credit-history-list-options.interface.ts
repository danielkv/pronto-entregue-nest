import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { CreditHistoryFilterDTO } from '../dtos/credit-history.filters.dto';
import { CreditHistory } from '../entities/credit.history.entity';

export interface ICreditHistoryListOptions extends IRepositoryListOptions<CreditHistory, CreditHistoryFilterDTO> {}
