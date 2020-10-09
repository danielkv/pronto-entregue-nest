import { Inject, Injectable } from '@nestjs/common';
import { CompanyFilterDTO } from '../dtos/company.filter.dto';
import { GeoPoint } from '../../../common/types/geo-point';
import { ICompanyRepository } from '../interfaces/company.repository.interface';

@Injectable()
export class CountCompaniesService {
    constructor(
        @Inject('ICompanyRepository')
        private companyRepository: ICompanyRepository,
    ) {}

    execute(filter?: CompanyFilterDTO, userLocation?: GeoPoint): Promise<number> {
        return this.companyRepository.getCount(filter, userLocation);
    }
}
