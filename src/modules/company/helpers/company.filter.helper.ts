import { Injectable } from '@nestjs/common';
import { FilterHelper } from 'src/modules/common/helpers/filter.helper';
import { IFilterHelper } from 'src/modules/common/interfaces/IFilterHelper';
import { Company } from '../entities/company.entity';
import { CompanyFilter } from '../types/company.filter';
import { CompanyLocationFilter } from '../filters/company.location.filter';
import { CompanySearchFilter } from '../filters/company.search.filter';
import { CompanyPublishedFilter } from '../filters/company.published.filter';
import { CompanyActiveFilter } from '../filters/company.active.filter';

@Injectable()
export class CompanyFilterHelper extends FilterHelper<Company, CompanyFilter>
    implements IFilterHelper<Company, CompanyFilter> {
    constructor(
        private locaionFilter: CompanyLocationFilter,
        private searchFilter: CompanySearchFilter,
        private publishedFilter: CompanyPublishedFilter,
        private activeFilter: CompanyActiveFilter,
    ) {
        super();
    }

    apply(query, filter) {
        this.applyFilters(query, filter, [
            this.searchFilter,
            this.locaionFilter,
            this.publishedFilter,
            this.activeFilter,
        ]);
    }
}
