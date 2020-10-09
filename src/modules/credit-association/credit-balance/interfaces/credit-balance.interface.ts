import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { CreditBalanceFilterDTO } from '../dtos/credit-balance.filters.dto';
import { CreditBalance } from '../entities/credit.balance.entity';

export interface ICreditBalanceRepository
    extends IRepositoryBase<CreditBalance, CreditBalanceFilterDTO> {}
