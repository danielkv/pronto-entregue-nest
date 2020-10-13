import { Inject, Injectable } from '@nestjs/common';
import { CompanySectionFilterDTO } from '../dtos/company-section.filter.dto';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionActiveFilter } from '../filters/company-section.active.filter';
import { CompanySectionCompanyFilter } from '../filters/company-section.company.filter';
import { CompanySectionLocationFilter } from '../filters/company-section.location.filter';
import { CompanySectionSearchFilter } from '../filters/company-section.search.filter';
import { ICompanySectionRepository } from '../interfaces/company-section.repository.interface';
import { IRepositoryListOptions } from '../../../common/interfaces/IRepositoryListOptions';

@Injectable()
export class CountCompanySectionsService {
    constructor(
        @Inject('ICompanySectionRepository') private companySectionRepository: ICompanySectionRepository,
        private companySectionActiveFilter: CompanySectionActiveFilter,
        private companySectionSearchFilter: CompanySectionSearchFilter,
        private companySectionCompanyFilter: CompanySectionCompanyFilter,
        private companySectionLocationFilter: CompanySectionLocationFilter,
    ) {}

    execute(filter?: CompanySectionFilterDTO): Promise<number> {
        const options: IRepositoryListOptions<CompanySection, CompanySectionFilterDTO> = {
            filter,
            filterHelpers: [
                this.companySectionActiveFilter,
                this.companySectionSearchFilter,
                this.companySectionCompanyFilter,
                this.companySectionLocationFilter,
            ],
        };

        return this.companySectionRepository.getCount(options);
    }
}
