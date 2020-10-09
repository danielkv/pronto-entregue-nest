import { Inject, Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { PageInfo } from '../../common/types/page-info';
import { CompanyFilterDTO } from '../dtos/company.filter.dto';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { ICompanyRepository } from '../interfaces/company.repository.interface';

@Injectable()
export class ListCompaniesService {
    constructor(
        @Inject('ICompanyRepository')
        private companyRepository: ICompanyRepository,
    ) {}

    async execute(
        filter?: CompanyFilterDTO,
        pagination?: PageInfo,
        userLocation?: GeoPoint,
    ): Promise<Company[]> {
        return this.companyRepository.getList(filter, pagination, userLocation);
    }
}
