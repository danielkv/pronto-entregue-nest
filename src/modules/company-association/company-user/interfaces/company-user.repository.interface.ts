import { User } from 'src/modules/user-association/user/entities/user.entity';
import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { Company } from '../../company/entities/company.entity';
import { CompanyUser } from '../entities/company.user.entity';

export interface ICompanyUserRepository extends IRepositoryBase<CompanyUser> {
    findConnection(companyId: Company['id'], userId: User['id']): Promise<CompanyUser>;
}
