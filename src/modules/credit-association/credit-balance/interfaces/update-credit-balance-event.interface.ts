import { CreditBalance } from '../entities/credit.balance.entity';

export interface IUpdateCreditBalanceEvent {
    creditBalance: CreditBalance;
}
