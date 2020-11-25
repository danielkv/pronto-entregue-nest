import { User } from 'src/modules/user-association/user/entities/user.entity';
import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { CreditBalance } from '../entities/credit.balance.entity';

export interface ICreditBalanceRepository extends IRepositoryBase<CreditBalance> {
    getUserBalance(userId: User['id']): Promise<number>;
    updateByUserId(userId: User['id'], value: number): Promise<any>;
}
