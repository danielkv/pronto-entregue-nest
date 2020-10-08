import { Inject, Injectable } from '@nestjs/common';
import { CompanyFilterDTO } from '../dtos/company.filter';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { ICompanyRepository } from '../interfaces/company.repository.interface';

@Injectable()
export class CountCompaniesService {
    constructor(
        @Inject('ICompanyRepository')
        private companyRepository: ICompanyRepository,
    ) {}

    execute(filter?: CompanyFilterDTO, userLocation?: GeoPoint): Promise<number> {
        // create query
        const query = this.companyRepository.createQueryBuilder('company');

        // apply areas selection
        this.companyRepository.applyAreasSelection(query, userLocation);

        // apply filters
        query.applyFilters(filter);

        // return count items
        return query.getCount();
    }
}
