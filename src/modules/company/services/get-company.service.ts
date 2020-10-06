import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeoPoint } from 'src/modules/common/types/geo-point';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanyBaseSelection } from '../helpers/company.base.selection';
import { CompanyMapper } from '../helpers/company-mapper';
import { CompanyAreasSelection } from '../helpers/company.areas.selection';
import { CompanyUserLocationSelection } from '../helpers/company.user.location.selection';

@Injectable()
export class GetCompanyService {
    constructor(
        @InjectRepository(Company) private companyRepository: Repository<Company>,
        private companyBaseSelection: CompanyBaseSelection,
        private selectUserLocation: CompanyUserLocationSelection,
        private selectAreas: CompanyAreasSelection,
        private companyMapper: CompanyMapper,
    ) {}

    async execute(companyId: number, userLocation?: GeoPoint): Promise<Company> {
        const query = this.companyRepository.createQueryBuilder('company');

        // apply base selection
        this.companyBaseSelection.apply(query);

        // apply selection
        this.selectUserLocation.apply(query, userLocation);

        // apply areas selection
        this.selectAreas.apply(query, userLocation);

        query.where({ id: companyId });
        query.limit(1);

        const { entities: companies, raw } = await query.getRawAndEntities();

        this.companyMapper.apply(companies, raw);

        return companies[0];
    }
}
