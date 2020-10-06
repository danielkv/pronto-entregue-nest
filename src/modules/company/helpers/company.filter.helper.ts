import { Injectable } from '@nestjs/common';
import { FilterHelper } from 'src/modules/common/helpers/filter.helper';
import { IFilterHelper } from 'src/modules/common/interfaces/IFilterHelper';
import { Company } from '../entities/company.entity';
import { CompanyFilter } from '../types/company.filter';
import { FilterLocation } from './filter.location';
import { FilterSearch } from './filter.search';

@Injectable()
export class CompanyFilterHelper extends FilterHelper<Company, CompanyFilter>
    implements IFilterHelper<Company, CompanyFilter> {
    constructor(private filterLocation: FilterLocation, private filterSearch: FilterSearch) {
        super();
    }

    apply(query, filter) {
        this.applyFilters(query, filter, [this.filterSearch, this.filterLocation]);
    }
}
