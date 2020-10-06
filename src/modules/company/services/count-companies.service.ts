import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyFilter } from '../dtos/company.filter';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class CountCompaniesService {
    constructor(
        @InjectRepository(CompanyRepository)
        private companyRepository: CompanyRepository,
    ) {}

    execute(filter?: CompanyFilter, userLocation?: GeoPoint): Promise<number> {
        // create query
        const query = this.companyRepository.createQueryBuilder('company');

        // apply areas selection
        this.companyRepository.applyAreasSelection(query, userLocation);

        // apply filters
        this.companyRepository.applyFilters(query, filter);

        // return count items
        return query.getCount();
    }
}
