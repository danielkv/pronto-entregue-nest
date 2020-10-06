import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanyFilter } from '../dtos/company.filter';
import { CompanyFilterHelper } from '../helpers/company.filter.helper';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { CompanyAreasSelection } from '../helpers/company.areas.selection';

@Injectable()
export class CountCompaniesService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        private selectAreas: CompanyAreasSelection,
        private companyFilterHelper: CompanyFilterHelper,
    ) {}

    execute(filter?: CompanyFilter, userLocation?: GeoPoint): Promise<number> {
        // create query
        const query = this.companyRepository.createQueryBuilder('company');

        // apply areas selection
        this.selectAreas.apply(query, userLocation);

        // apply filters
        this.companyFilterHelper.apply(query, filter);

        // return count items
        return query.getCount();
    }
}
