import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionExtraFilterDTO } from '../dtos/company-section.filter.dto';
import { ICompanySectionRepository } from '../interfaces/company-section.repository.interface';

@EntityRepository(CompanySection)
export class CompanySectionRepository extends RepositoryBase<CompanySection, CompanySectionExtraFilterDTO>
    implements ICompanySectionRepository {
    constructor() {
        super();

        this.setQueryBuilderTableName('companySection');
    }
}
