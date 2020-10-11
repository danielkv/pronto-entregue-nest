import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionFilterDTO } from '../dtos/compaany-section.filter.dto';
import { ICompanySectionRepository } from '../interfaces/company-section.repository.interface';
import { CompanySectionActiveFilter } from '../filters/company-section.active.filter';
import { CompanySectionSearchFilter } from '../filters/company-section.search.filter';
import { CompanySectionCompanyFilter } from '../filters/company-section.company.filter';

@EntityRepository(CompanySection)
export class CompanySectionRepository extends RepositoryBase<CompanySection, CompanySectionFilterDTO>
    implements ICompanySectionRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('companySection');

        this.setFilters([
            new CompanySectionActiveFilter(),
            new CompanySectionSearchFilter(),
            new CompanySectionCompanyFilter(),
        ]);
    }
}

export const CompanySectionRepositoryProvider = new RepositoryProviderFactory(
    'ICompanySectionRepository',
    CompanySectionRepository,
).create();
