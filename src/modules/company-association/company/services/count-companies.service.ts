import { Inject, Injectable } from '@nestjs/common';
import { CompanyFilterDTO } from '../dtos/company.filter.dto';
import { GeoPoint } from '../../../common/types/geo-point';
import { ICompanyRepository } from '../interfaces/company.repository.interface';
import { ICompanyFiltersOptions } from '../interfaces/company-filters-options.interface';
import { CompanyActiveFilter } from '../filters/company.active.filter';
import { CompanyLocationFilter } from '../filters/company.location.filter';
import { CompanyPublishedFilter } from '../filters/company.published.filter';
import { CompanySearchFilter } from '../filters/company.search.filter';
import { CompanyIdFilter } from '../filters/company.id.filter';

@Injectable()
export class CountCompaniesService {
    constructor(
        @Inject('ICompanyRepository')
        private companyRepository: ICompanyRepository,
        private companyActiveFilter: CompanyActiveFilter,
        private companyLocationFilter: CompanyLocationFilter,
        private companyPublishedFilter: CompanyPublishedFilter,
        private companySearchFilter: CompanySearchFilter,
        private companyIdFilter: CompanyIdFilter,
    ) {}

    execute(filter?: CompanyFilterDTO, userLocation?: GeoPoint): Promise<number> {
        const options: ICompanyFiltersOptions = {
            userLocation,
            filter,
            filterHelpers: [
                this.companyActiveFilter,
                this.companyLocationFilter,
                this.companyPublishedFilter,
                this.companySearchFilter,
                this.companyIdFilter,
            ],
        };
        return this.companyRepository.getCount(options);
    }
}
