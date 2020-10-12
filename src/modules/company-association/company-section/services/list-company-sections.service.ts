import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from 'src/modules/common/types/page-info';
import { CompanySectionFilterDTO } from '../dtos/company-section.filter.dto';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionActiveFilter } from '../filters/company-section.active.filter';
import { CompanySectionCompanyFilter } from '../filters/company-section.company.filter';
import { CompanySectionLocationFilter } from '../filters/company-section.location.filter';
import { CompanySectionSearchFilter } from '../filters/company-section.search.filter';
import { ICompanySectionRepository } from '../interfaces/company-section.repository.interface';

@Injectable()
export class ListCompanySectionsService {
    constructor(
        @Inject('ICompanySectionRepository') private companySectionRepository: ICompanySectionRepository,
        private companySectionActiveFilter: CompanySectionActiveFilter,
        private companySectionSearchFilter: CompanySectionSearchFilter,
        private companySectionCompanyFilter: CompanySectionCompanyFilter,
        private companySectionLocationFilter: CompanySectionLocationFilter,
    ) {}

    execute(filter?: CompanySectionFilterDTO, pagination?: PageInfo): Promise<CompanySection[]> {
        this.companySectionRepository.setFilters([
            this.companySectionActiveFilter,
            this.companySectionSearchFilter,
            this.companySectionCompanyFilter,
            this.companySectionLocationFilter,
        ]);

        return this.companySectionRepository.getList({ filter, pagination });
    }
}
