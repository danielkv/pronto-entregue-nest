import { User } from 'src/modules/user/entities/user.entity';
import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { Company } from '../../company/entities/company.entity';
import { CompanyUserFilterDTO } from '../dtos/company-user.filter.dto';
import { CompanyUser } from '../entities/company.user.entity';

export interface ICompanyUserRepository extends IRepositoryBase<CompanyUser, CompanyUserFilterDTO> {
    findConnection(companyId: Company['id'], userId: User['id']): Promise<CompanyUser>;
}
