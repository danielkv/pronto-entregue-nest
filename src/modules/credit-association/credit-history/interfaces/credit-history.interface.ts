import { User } from 'src/modules/user-association/user/entities/user.entity';
import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { CreditHistory } from '../entities/credit.history.entity';

export interface ICreditHistoryRepository extends IRepositoryBase<CreditHistory> {
    getByUserId(userId: User['id']): Promise<CreditHistory[]>;
}
