import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { CreditHistoryFilterDTO } from '../dtos/credit-history.filters.dto';
import { CreditHistory } from '../entities/credit.history.entity';

export interface ICreditHistoryRepository
    extends IRepositoryBase<CreditHistory, CreditHistoryFilterDTO> {}
