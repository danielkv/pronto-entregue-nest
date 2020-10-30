import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { PageInfo } from '../../../common/types/page-info';
import { CompanyFilterDTO } from '../dtos/company.filter.dto';
import { GeoPoint } from '../../../common/types/geo-point';
import { ICompanyRepository } from '../interfaces/company.repository.interface';
import { ICompanyRepositoryListOptions } from '../interfaces/company-options.repository.interface';
import { CompanyActiveFilter } from '../filters/company.active.filter';
import { CompanyLocationFilter } from '../filters/company.location.filter';
import { CompanyPublishedFilter } from '../filters/company.published.filter';
import { CompanySearchFilter } from '../filters/company.search.filter';
import { CompanyIdFilter } from '../filters/company.id.filter';

@Injectable()
export class ListCompaniesService {
    constructor(
        @Inject('ICompanyRepository')
        private companyRepository: ICompanyRepository,
        private companyActiveFilter: CompanyActiveFilter,
        private companyLocationFilter: CompanyLocationFilter,
        private companyPublishedFilter: CompanyPublishedFilter,
        private companySearchFilter: CompanySearchFilter,
        private companyIdFilter: CompanyIdFilter,
    ) {}

    async execute(filter?: CompanyFilterDTO, pagination?: PageInfo, userLocation?: GeoPoint): Promise<Company[]> {
        const options: ICompanyRepositoryListOptions = {
            pagination,
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

        return this.companyRepository.getList(options);
    }
}
