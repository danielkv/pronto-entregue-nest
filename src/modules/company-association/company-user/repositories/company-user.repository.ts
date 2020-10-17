import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CompanyUserFilterDTO } from '../dtos/company-user.filter.dto';
import { CompanyUser } from '../entities/company.user.entity';
import { ICompanyUserRepository } from '../interfaces/company-user.repository.interface';
import { RepositoryProviderFactory } from 'src/modules/common/helpers/repository-provider.factory';
import { Company } from '../../company/entities/company.entity';
import { User } from 'src/modules/user/entities/user.entity';

@EntityRepository(CompanyUser)
export class CompanyUserRepository extends RepositoryBase<CompanyUser, CompanyUserFilterDTO>
    implements ICompanyUserRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('companyUser');
    }

    findConnection(companyId: Company['id'], userId: User['id']): Promise<CompanyUser> {
        return this.findOne({ companyId, userId, active: true });
    }
}

export const CompanyUserRepositoryProvider = new RepositoryProviderFactory(
    'ICompanyUserRepository',
    CompanyUserRepository,
).create();
