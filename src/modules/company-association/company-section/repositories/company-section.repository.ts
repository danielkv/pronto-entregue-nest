import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionFilterDTO } from '../dtos/company-section.filter.dto';
import { ICompanySectionRepository } from '../interfaces/company-section.repository.interface';

@EntityRepository(CompanySection)
export class CompanySectionRepository extends RepositoryBase<CompanySection, CompanySectionFilterDTO>
    implements ICompanySectionRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('companySection');
    }
}

export const CompanySectionRepositoryProvider = new RepositoryProviderFactory(
    'ICompanySectionRepository',
    CompanySectionRepository,
).create();
