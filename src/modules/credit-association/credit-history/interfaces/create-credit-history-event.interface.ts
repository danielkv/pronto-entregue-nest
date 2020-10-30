import { CreditHistory } from '../entities/credit.history.entity';

export interface ICreateCreditHistoryEvent {
    creditHistory: CreditHistory;
}
